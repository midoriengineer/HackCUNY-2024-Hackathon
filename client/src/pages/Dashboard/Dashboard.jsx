import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Inbox from "./Inbox";
import Spam from "./Spam";
import Trash from "./Trash";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Dashboard() {
  const [currentPage, setCurrentPage] = useState("inbox");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [setup, setSetup] = useState(false);
  // let setupInbox = false;
  // let setupSpam = false;
  // let setupTrash = false;
  const [setupInbox, setSetupInbox] = useState(false)
  const [setupSpam, setSetupSpam] = useState(false)
  const [setupTrash, setSetupTrash] = useState(false)

  const readyCount = useRef(0)

  const [loading, setLoading] = useState(true);

  const [googleToken, setGoogleToken] = useState();
  // const [inboxRaw, setInboxRaw] = useState([]);
  // const [spamRaw, setSpamRaw] = useState([]);
  // const [trashRaw, setTrashRaw] = useState([]);
  const inboxRaw = useRef([])
  const spamRaw = useRef([])
  const trashRaw = useRef([])
  const inbox = useRef([])
  const spam = useRef([])
  const trash = useRef([])

  const subject = useRef("")
  const from= useRef("")
  const date= useRef("")
  const message= useRef("")
  const phish = useRef(false)

  const api_phish1 = useRef(false)
  const api_phish2 = useRef(false)
  const api_phish3 = useRef(false)

  async function trained_model_query(query) {
    if(loading === false) return

    return fetch("http://localhost:5000/trained_model_query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "query": query
      })
    }).then(
      res => res.json()
    ).then(
      data => {
        if (data === "Phishing") return true;
        return false;
      }
    ).catch(err => {
      console.log(err);
    });
  }

  async function embeddings_query(query) {
    if(loading === false) return

    return fetch("http://localhost:5000/embeddings_query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "query": query
      })
    }).then(
      res => res.json()
    ).then(
      data => {
        let count = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i] === "Phishing") count++;
        }
        if (count > 4) return true;
        return false;
      }
    ).catch(err => {
      console.log(err);
    });
  }

  async function general_model_query(query) {
    if(loading === false) return
    return fetch("http://localhost:5000/general_model_query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "query": query
      })
    }).then(
      res => res.json()
    ).then(
      data => {
        if (data === "Phishing") return true;
        return false;
      }
    ).catch(err => {
      console.log(err);
    });
  }


  async function getFolder(folder) {
    await fetch(`https://www.googleapis.com/gmail/v1/users/me/messages?q=label:${folder}&maxResults=10`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${googleToken}`,
      },

    }).then(
      res => res.json()
    ).then(
      data => {

        if (!data || data && !data.messages) {
          if (folder === "spam") setSetupSpam(true);
          if (folder === "trash") setSetupTrash(true);
          if (folder === "inbox") setSetupInbox(true);
          readyCount.current += 1
          if (readyCount.current > 2) {
            setLoading(false);
          }
          return
        }
        for (let i = 0; i < data.messages.length; i++) {
          let length = data.messages.length
          const emailId = data.messages[i]?.id
          if (emailId) {
            fetch(`https://www.googleapis.com/gmail/v1/users/me/messages/${emailId}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${googleToken}`,
              },
            }).then(
              res => res.json()
            ).then(
              data => {
                if (folder === "spam") spamRaw.current.push(data);
                if (folder === "trash") trashRaw.current.push(data);
                if (folder === "inbox") inboxRaw.current.push(data);

                if (length - 1 <= i) {
                  if (folder === "spam") setSetupSpam(true);
                  if (folder === "trash") setSetupTrash(true);
                  if (folder === "inbox") setSetupInbox(true);
                }
              }
            ).catch(err => {
              console.log(err)
            })
          }
        }
      }
    ).catch(err => {
      console.log(err)
    })

  }

  async function setFolder(folder, newFolder) {
    for (let j = 0; j < folder.current.length; j++) {
  
      for (let i = 0; i < folder.current[j].payload.headers.length; i++) {
        if (folder.current[j].payload.headers[i].name === "From") {
          from.current = folder.current[j].payload.headers[i].value
        }
        if (folder.current[j].payload.headers[i].name === "Subject") {
          subject.current = folder.current[j].payload.headers[i].value
        }
        if (folder.current[j].payload.headers[i].name === "Date") {
          date.current = folder.current[j].payload.headers[i].value
        }
      }


        const decodedString = await fetch("http://localhost:5000/decode", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: folder.current[j].payload.parts[0].body.data }),
        })
          .then(response => response.json())
          .then(decodedData => {

            return decodedData.decoded_data;
          })
          .catch(error => {
            console.error('Error sending POST request to Flask:', error);
          });
        message.current = "" + decodedString

        let query = "From: " + from + " Subject: " + subject + " Message: " + message
        let count = 0


        api_phish1.current = await trained_model_query(query)
        api_phish2.current = await embeddings_query(query)
        api_phish3.current = await general_model_query(query)

        if (api_phish1.current === true) count++
        if (api_phish2.current === true) count++
        if (api_phish3.current === true) count++

        if (count > 1) phish.current = true

        newFolder.current.push({
          "from": from.current, "subject": subject.current, "date": date.current, "message": message.current, "phish": phish.current

        });
      
    }
    readyCount.current += 1
    if (readyCount.current > 2) {
      setLoading(false);
    }

  }



  async function fetchGoogleToken() {
    const filePath = "http://localhost:5000/google_token";

    const response = await fetch(filePath);

    if (!response.ok) return

    const jsonData = await response.json();
    if (!jsonData) return
    if (jsonData && !jsonData.credentials_token) return

    setGoogleToken(jsonData.credentials_token)

  };

  useEffect(() => {
    fetchGoogleToken();
  }, []);

  useEffect(() => {
    if (googleToken && !setup) {
      setSetup(true); // Set a flag to prevent repeated setups
      getFolder("inbox");
      getFolder("spam");
      getFolder("trash");
    }
  }, [googleToken, setup]);

  useEffect(() => {
    if (setupInbox === true && setupSpam === true && setupTrash === true && loading === true) {
      if (spamRaw.current.length > 0) {
        setFolder(spamRaw, spam)
      }
      if (trashRaw.current.length > 0) {
        setFolder(trashRaw, trash)

      }
      if (inboxRaw.current.length > 0) {
        setFolder(inboxRaw, inbox)

      }
    }
  }, [setupInbox, setupSpam, setupTrash]);

  // EMAIL STUFFF--------------------------------------

  if (loading === true) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar onPageChange={handlePageChange} />
        <div className="flex-1 p-4">
          {currentPage === "inbox" && <Inbox folder={inbox.current} />}
          {currentPage === "spam" && <Spam folder={spam.current} />}
          {currentPage === "trash" && <Trash folder={trash.current} />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

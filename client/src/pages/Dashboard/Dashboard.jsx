import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Inbox from "./Inbox";
import Spam from "./Spam";
import Trash from "./Trash";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Dashboard() {


  const [currentPage, setCurrentPage] = useState("inbox");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // EMAIL STUFFF--------------------------------------

  let setup = false;
  // let setupInbox = false;
  // let setupSpam = false;
  // let setupTrash = false;
  const [setupInbox, setSetupInbox] = useState(false)
  const [setupSpam, setSetupSpam] = useState(false)
  const [setupTrash, setSetupTrash] = useState(false)

  let readyCount = 0

  const [loading, setLoading] = useState(false);

  const [googleToken, setGoogleToken] = useState();
  const [inboxRaw, setInboxRaw] = useState([]);
  const [spamRaw, setSpamRaw] = useState([]);
  const [trashRaw, setTrashRaw] = useState([]);
  const [inbox, setInbox] = useState([]);
  const [spam, setSpam] = useState([]);
  const [trash, setTrash] = useState([]);

  // function trained_model_query(query) {
  //   fetch("http://localhost:5000/trained_model_query", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       "query": query
  //     })
  //   }).then(
  //     res => res.json()
  //   ).then(
  //     data => {
  //       if (data === "Phishing") return true
  //       return false
  //     }
  //   ).catch(err => {
  //     console.log(err)
  //   })
  // }

  // function embeddings_query(query) {
  //   fetch("http://localhost:5000/embeddings_query", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       "query": query
  //     })
  //   }).then(
  //     res => res.json()
  //   ).then(
  //     data => {
  //       let count = 0
  //       for (let i = 0; i < data.length; i++) {
  //         if (data[i] === "Phishing") count++
  //       }
  //       if (count > 4) return true
  //       return false
  //     }
  //   ).catch(err => {
  //     console.log(err)
  //   })
  // }


  // function general_model_query(query) {
  //   fetch("http://localhost:5000/general_model_query", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       "query": query
  //     })
  //   }).then(
  //     res => res.json()
  //   ).then(
  //     data => {
  //       if (data === "Phishing") return true
  //       return false
  //     }
  //   ).catch(err => {
  //     console.log(err)
  //   })
  // }

  // function getFolder(folder) {

  //   if (!googleToken) return;
  //   fetch(`https://www.googleapis.com/gmail/v1/users/me/messages?q=label:${folder}&maxResults=10`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${googleToken}`,
  //     },

  //   }).then(
  //     res => res.json()
  //   ).then(
  //     data => {

  //       if (data && !data.messages) return
  //       if (!data) return
  //       for (let i = 0; i < data.messages.length; i++) {
  //         let length = data.messages.length
  //         const emailId = data.messages[i]?.id
  //         if (emailId) {
  //           fetch(`https://www.googleapis.com/gmail/v1/users/me/messages/${emailId}`, {
  //             method: "GET",
  //             headers: {
  //               Authorization: `Bearer ${googleToken}`,
  //             },
  //           }).then(
  //             res => res.json()
  //           ).then(
  //             data => {
  //               if (folder === "spam") setSpamRaw(prevData => [...prevData, data]);
  //               if (folder === "trash") setTrashRaw(prevData => [...prevData, data]);
  //               if (folder === "inbox") setInboxRaw(prevData => [...prevData, data]);
  //               if (length - 1 <= i) {
  //                 console.log("done")

  //                 if (folder === "spam") setSetupSpam(true)
  //                 if (folder === "trash") setSetupTrash(true)
  //                 if (folder === "inbox") setSetupInbox(true)
  //               }
  //             }
  //           ).catch(err => {
  //             console.log(err)
  //           })
  //         }
  //       }
  //     }
  //   ).catch(err => {
  //     console.log(err)
  //   })

  // }

  // function setFolder(folder, setFunction) {
  //   if (folder.length < 1) return []
  //   for (let j = 0; j < folder.length; j++) {
  //     let subject
  //     let from
  //     let date
  //     let message
  //     let phish = false

  //     for (let i = 0; i < folder[j].payload.headers.length; i++) {

  //       if (folder[j].payload.headers[i].name === "From") {
  //         from = folder[j].payload.headers[i].value
  //       }
  //       if (folder[j].payload.headers[i].name === "Subject") {
  //         subject = folder[j].payload.headers[i].value
  //       }
  //       if (folder[j].payload.headers[i].name === "Date") {
  //         date = folder[j].payload.headers[i].value
  //       }
  //     }

  //     // console.log(folder[j].payload.parts[0].body.data)
  //     const decodedString = fetch("http://localhost:5000/decode", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ query: folder[j].payload.parts[0].body.data }),
  //     })
  //       .then(response => response.json())
  //       .then(decodedData => {
  //         // console.log('Decoded data from Flask:', decodedData.decoded_data);

  //         return decodedData.decoded_data;
  //       })
  //       .catch(error => {
  //         console.error('Error sending POST request to Flask:', error);
  //       });
  //     message = "" + decodedString

  //     let query = "From: " + from + " Subject: " + subject + " Message: " + message
  //     let count = 0

  //     if (trained_model_query(query)) count++
  //     if (embeddings_query(query)) count++
  //     if (general_model_query(query)) count++

  //     if (count > 1) phish = true

  //     console.log(message)

  //     setFunction(prevData => [...prevData, {
  //       "from": from, "subject": subject, "date": date, "message": message, "phish": phish

  //     }]);
  //   }
  //   console.log("done")
  //   readyCount++
  //   if (readyCount === 3) setLoading(true)

  // }



  // async function fetchGoogleToken() {
  //   const filePath = "http://localhost:5000/google_token";

  //   const response = await fetch(filePath);

  //   if (!response.ok) return

  //   const jsonData = await response.json();
  //   if (!jsonData) return
  //   if (jsonData && !jsonData.credentials_token) return

  //   setGoogleToken(jsonData.credentials_token)

  // };

  // useEffect(() => {
  //   fetchGoogleToken()
  // }
  //   , []);

  // useEffect(() => {
  //   if (setup) return
  //   if (googleToken) {
  //     setup = true
  //     getFolder("inbox")
  //     getFolder("spam")
  //     getFolder("trash")
  //   }
  // }
  //   , [googleToken]);

  // useEffect(() => {
  //   if (!setupInbox) return
  //   console.log("done")
  //   if (inboxRaw.length > 0) {
  //     setFolder(inboxRaw, setInbox)
  //   }
  // }
  //   , [inboxRaw]);

  // useEffect(() => {
  //   if (!setupSpam) return
  //   if (spamRaw.length > 0) {
  //     setFolder(spamRaw, setSpam)
  //   }
  // }
  //   , [spamRaw]);

  // useEffect(() => {
  //   if (!setupTrash) return
  //   if (trashRaw.length > 0) {
  //     setFolder(trashRaw, setTrash)
  //   }
  // }
  //   , [trashRaw]);


  // console.log(inbox)
  // console.log(spam)
  // console.log(trash)
  // if (inbox.length > 0) {
  //   for (let i = 0; i < inbox[0].payload.headers.length; i++) {

  //       if (inbox[0].payload.headers[i].name === "From") {
  //           console.log(inbox[0].payload.headers[i].value)
  //       }
  //       if (inbox[0].payload.headers[i].name === "Subject") {
  //           console.log(inbox[0].payload.headers[i].value)
  //       }
  //       if (inbox[0].payload.headers[i].name === "Date") {
  //           console.log(inbox[0].payload.headers[i].value)
  //       }
  //   }
  //   const base64Data = inbox[0].payload.parts[0].body.data;
  //   const uriDecodedData = decodeURIComponent(base64Data);
  //   const decodedString = atob(uriDecodedData);
  //   console.log("" + decodedString);
  // }

  // EMAIL STUFFF--------------------------------------

  // if (loading != true) {
  //   return <h1>Loading...</h1>;
  // }
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar onPageChange={handlePageChange} />
        <div className="flex-1 p-4">
          {currentPage === "inbox" && <Inbox />}
          {currentPage === "spam" && <Spam />}
          {currentPage === "trash" && <Trash />}
        </div>
      </div>
      {/* <div style={{ background: "#fff", width: "100%" }}>
        <Container>
          <Row>
            <Col sm={4}><Sidebar onPageChange={handlePageChange} /></Col>
            <Col sm={8}>{currentPage === "inbox" && <Inbox folder={inbox} />}
              {currentPage === "spam" && <Spam folder={spam} />}
              {currentPage === "trash" && <Trash folder={trash} />}</Col>
          </Row>
        </Container>
      </div> */}
    </div>
  );

}

export default Dashboard;

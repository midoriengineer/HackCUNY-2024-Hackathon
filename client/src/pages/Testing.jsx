import { useState, useEffect } from "react";

const Testing = () => {
    let setup = false;
    const [data, setData] = useState([{}]);
    const [pineconeData, setPineconeData] = useState();
    const [cohereData, setCohereData] = useState();
    const [openaiData, setOpenaiData] = useState();
    const [googleToken, setGoogleToken] = useState();
    const [spam, setSpam] = useState([]);
    const [inbox, setInbox] = useState([]);
    const [trash, setTrash] = useState([]);

    // const query = "Is this email phishing or safe?: If you made purchases from Udemy.com between August 23, 2017 and April 21, 2023, YOU MAY BE ELIGIBLE TO RECEIVE A CASH PAYMENT OF UP TO FORTY DOLLARS ($40.00) depending on the number of Eligible Course Purchases you have made and the number of claims made by class members. Click here to file a claim by July 21, 2023. Your Settlement Claim ID is: JFQ-1452194. Why did I get this Notice? A settlement (“Settlement”) has been proposed in a class action lawsuit pending in the Superior Court of California, County of San Diego (“Court”) titled Marion Williams, et al. v. Udemy, Inc. (the “Action”). According to available records, you might be a “Class Member.” The purpose of this Email Notice is to inform you of the Action and the Settlement so that you may decide what steps to take in relation to it.  What is the Action about? The Action was filed against Udemy, Inc. (“Udemy” or “Defendant”) by Plaintiff Marion Williams alleging Udemy engaged in deceptive advertising by advertising improper discounts on education courses sold on its e-commerce website, Udemy.com. Udemy denies wrongdoing and liability and both sides disagree on how much, if anything, the Class could have recovered after trial. No court has decided which side is right. But both sides agreed to provide benefits to Class Members and resolve the Action. Am I a Class Member? You are a “Class Member” if you purchased a course or courses from Udemy at a discount based on a Reference Price Promotion during the period of August 23, 2017 through and including April 21, 2023. Excluded from the Class are Udemy’s Counsel, Udemy’s officers and directors, and the judge presiding over the Action. What relief does the Settlement provide? Udemy has agreed to provide a cash payment of four dollars ($4.00) for every Eligible Course Purchase to each Class Member who timely submits a valid Claim Form by July 21, 2023 up to $40. What are my other options? If you don’t want to be legally bound by the Settlement, you must exclude yourself by July 21, 2023, or you won’t be able to sue Udemy about the legal claims in the Action ever again. If you exclude yourself, you cannot receive any benefit. If you stay in the Settlement, you may object to it by July 10, 2023. The detailed Notice available at www.PricePromotionSettlement.com explains how to request exclusion or object. The Court will hold a hearing on July 28, 2023 at 1:30 PM to consider whether to approve the Settlement, and a request by the lawyers representing all Class Members (Lynch Carpenter LLP and Keller Postman LLC) for $1,000,000 in attorneys’ fees, costs, and Individual Settlement Award for the Named Plaintiff (Marion Williams) who will request for $2,500 for his service. You may ask to appear at the hearing, but you don’t have to. More information? For complete information about the Settlement, to view the Settlement Agreement, related Court documents and Claim Form, and to learn more about how to exercise your various options under the Settlement, visit www.PricePromotionSettlement.com. You may also write to the Claims Administrator at the email address: info@PricePromotionSettlement.com or the postal address: PO Box 3868, Baton Rouge, LA 70821."

    useEffect(() => {
        if (setup) return;
        fetchGoogleToken()
        setup = true;
        fetch("http://localhost:5000/testing")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });

        // fetch("http://localhost:5000/trained_model_query", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         "query": query
        //     })
        // }).then(
        //     res => res.json()
        // ).then(
        //     data => {
        //         setCohereData(data)
        //     }
        // ).catch(err => {
        //     console.log(err)
        // })

        // fetch("http://localhost:5000/embeddings_query", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         "query": query
        //     })
        // }).then(
        //     res => res.json()
        // ).then(
        //     data => {
        //         setPineconeData(data)
        //     }
        // ).catch(err => {
        //     console.log(err)
        // })

        // fetch("http://localhost:5000/general_model_query", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         "query": query
        //     })
        // }).then(
        //     res => res.json()
        // ).then(
        //     data => {
        //         setOpenaiData(data)
        //     }
        // ).catch(err => {
        //     console.log(err)
        // })
    }, []);

    useEffect(() => {
        if (!googleToken) return;
        fetch("https://www.googleapis.com/gmail/v1/users/me/messages?q=in:inbox&maxResults=10", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${googleToken}`,
              },

        }).then(
            res => res.json()
        ).then(
            data => {

                for (let i = 0; i < data.messages.length; i++) {
                    fetch(`https://www.googleapis.com/gmail/v1/users/me/messages/${data.messages[i].id}`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${googleToken}`,
                          },
                    }).then(
                        res => res.json()
                    ).then(
                        data => {
                            console.log(data)
                            setInbox(prevData => [...prevData, data]);
                        }
                    ).catch(err => {
                        console.log(err)
                    })
                }


                // console.log(data)
            }
        ).catch(err => {
            console.log(err)
        })

    }, [googleToken]);


    async function fetchGoogleToken() {
        const filePath = "http://localhost:5000/google_token";

        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();

        setGoogleToken(jsonData.credentials_token)

    };

    return (
        <div>
            <ul>
                <li>{data.testing1}</li>
                <li>{data.testing2}</li>
                <h1>{googleToken}</h1>

                {/* <p>{query}</p> */}
                {/* <li>{cohereData}</li>
                <li>{pineconeData}</li>
                <li>{openaiData}</li> */}
            </ul>
        </div>
    );
};

export default Testing;

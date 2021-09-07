const express = require("express");
const cors = require('cors');

const axios = require("axios");
const xml2js = require('xml2js');
const parser = new xml2js.Parser(/* options */);

const app = express()

app.use(cors());
app.use(express.json())

app.post("/medlemsmatrikel", (req, res) => {
    const {guid, gitUsername, gitPassword} = req.body;
    const url = "https://gitsys.golf.se/WSAPI/Ver_3/Member/Member3.asmx"
    // let xml = `
    // <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="http://gitapi.golf.se/Member/Member3" xmlns:types="http://gitapi.golf.se/Member/Member3/encodedTypes" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    //   <soap:Header>
    //     <tns:SoapAuthenticationHeader>
    //       <user xsi:type="xsd:string">W06188-104</user>
    //       <password xsi:type="xsd:string">86z00Q</password>
    //     </tns:SoapAuthenticationHeader>
    //   </soap:Header>
    //   <soap:Body soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
    //     <tns:FindPerson>
    //       <organizationalUnitID xsi:type="xsd:string">E06B1880-5618-4D8B-8A3F-4BC05916DDEF</organizationalUnitID>
    //       <IDNumber xsi:type="xsd:string"></IDNumber>
    //       <fName xsi:type="xsd:string">jimmy</fName>
    //       <lName xsi:type="xsd:string"></lName>
    //       <memberNumber xsi:type="xsd:string"></memberNumber>
    //       <searchMembers xsi:type="xsd:boolean">true</searchMembers>
    //       <searchFormerMembers xsi:type="xsd:boolean">true</searchFormerMembers>
    //       <searchQueues xsi:type="xsd:boolean">true</searchQueues>
    //       <searchAll xsi:type="xsd:boolean">true</searchAll>
    //     </tns:FindPerson>
    //   </soap:Body>
    // </soap:Envelope>
    // `;
    // const headers = {
    //   'Content-Type': 'text/xml;charset=UTF-8',
    //   SOAPAction: "http://gitapi.golf.se/Member/Member3/FindPerson",
    // };
    let xml = `
    <soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mem="http://gitapi.golf.se/Member/Member3">
      <soapenv:Header>
          <SoapAuthenticationHeader xsi:type="mem:SoapAuthenticationHeader">
            <!--Optional:-->
            <user xsi:type="xsd:string">${gitUsername}</user>
            <!--Optional:-->
            <password xsi:type="xsd:string">${gitPassword}</password>
          </SoapAuthenticationHeader>
      </soapenv:Header>
      <soapenv:Body>
          <mem:GetMatrikelDataOrgUnit soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
            <organizationalUnitID xsi:type="xsd:string">${guid}</organizationalUnitID>
          </mem:GetMatrikelDataOrgUnit>
      </soapenv:Body>
    </soapenv:Envelope>
    `;
    const headers = {
      'Content-Type': 'text/xml;charset=UTF-8',
      SOAPAction: "http://gitapi.golf.se/Member/Member3/GetMatrikelDataOrgUnit",
    };
    let json;
    axios.post(url,
           xml,
           {headers: headers})
           .then(result=>{
                console.log("Req lyckades");
                // console.log(res.data);
                parser.parseStringPromise(result.data).then(function (parseResult) {
                  console.dir(parseResult);
                  // json = JSON.stringify(parseResult);
                  console.log(parseResult)
                  console.log('Done');
                  res.json(parseResult)
                  // res.json(json)
                })
                .catch(function (err) {
                  // Failed
                });
           })
           .catch(err=>{console.log(err)});
    // console.log(json);
    //        return res.json({
    //     "message": json
    // });
           
})

app.post("/login", (req, res) => {
  const {guid, gitUsername, gitPassword, username, password} = req.body;
  const url = "https://gitsys.golf.se/WSAPI/Ver_3/Permission/Permission3.asmx"
  // let xml = `
  // <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="http://gitapi.golf.se/Member/Member3" xmlns:types="http://gitapi.golf.se/Member/Member3/encodedTypes" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  //   <soap:Header>
  //     <tns:SoapAuthenticationHeader>
  //       <user xsi:type="xsd:string">W06188-104</user>
  //       <password xsi:type="xsd:string">86z00Q</password>
  //     </tns:SoapAuthenticationHeader>
  //   </soap:Header>
  //   <soap:Body soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
  //     <tns:FindPerson>
  //       <organizationalUnitID xsi:type="xsd:string">E06B1880-5618-4D8B-8A3F-4BC05916DDEF</organizationalUnitID>
  //       <IDNumber xsi:type="xsd:string"></IDNumber>
  //       <fName xsi:type="xsd:string">jimmy</fName>
  //       <lName xsi:type="xsd:string"></lName>
  //       <memberNumber xsi:type="xsd:string"></memberNumber>
  //       <searchMembers xsi:type="xsd:boolean">true</searchMembers>
  //       <searchFormerMembers xsi:type="xsd:boolean">true</searchFormerMembers>
  //       <searchQueues xsi:type="xsd:boolean">true</searchQueues>
  //       <searchAll xsi:type="xsd:boolean">true</searchAll>
  //     </tns:FindPerson>
  //   </soap:Body>
  // </soap:Envelope>
  // `;
  // const headers = {
  //   'Content-Type': 'text/xml;charset=UTF-8',
  //   SOAPAction: "http://gitapi.golf.se/Member/Member3/FindPerson",
  // };
  let xml = `
  <soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:per="http://gitapi.golf.se/Permission/Permission3">
   <soapenv:Header>
      <SoapAuthenticationHeader xsi:type="per:SoapAuthenticationHeader">
         <!--Optional:-->
         <user xsi:type="xsd:string">${gitUsername}</user>
         <!--Optional:-->
         <password xsi:type="xsd:string">${gitPassword}</password>
      </SoapAuthenticationHeader>
   </soapenv:Header>
   <soapenv:Body>
      <per:CheckUserLoginClub soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <username xsi:type="xsd:string">${username}</username>
         <password xsi:type="xsd:string">${password}</password>
         <organizationalUnitID xsi:type="xsd:string">${guid}</organizationalUnitID>
      </per:CheckUserLoginClub>
   </soapenv:Body>
</soapenv:Envelope>
  `;
  const headers = {
    'Content-Type': 'text/xml;charset=UTF-8',
    SOAPAction: "http://gitapi.golf.se/Permission/Permission3/CheckUserLoginClub",
  };
  let json;
  axios.post(url,
         xml,
         {headers: headers})
         .then(result=>{
              console.log("Req lyckades");
              // console.log(res.data);
              parser.parseStringPromise(result.data).then(function (parseResult) {
                console.dir(parseResult);
                // json = JSON.stringify(parseResult);
                console.log(parseResult)
                console.log('Done');
                res.json(parseResult)
                // res.json(json)
              })
              .catch(function (err) {
                // Failed
              });
         })
         .catch(err=>{console.log(err)});
  // console.log(json);
  //        return res.json({
  //     "message": json
  // });
         
})

const port = 4000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
import json2html from "./json2html";
import vendorsObj from './vendorList';

const vendors = vendorsObj.vendors;
const table = 


{"<>":"table","id":"purposes-table","class":"uk-table uk-table-hover uk-table-divider","html":[
    {"<>":"thead","html":[
        {"<>":"tr","html":[
            {"<>":"th","html":"Name"},
            {"<>":"th","html":"Policy"}
          ]}
      ]},
    {"<>":"tbody","html":[
        {"<>":"tr","html":[
            {"<>":"td","html":"${name}"},
            {"<>":"td","html":"<a href='${policyUrl}'>LINK</a>"}
          ]}
      ]}
  ]}

  const mini = {"<>":"tbody","html":[
    {"<>":"tr","html":[
        {"<>":"td","html":"${name}"},
        {"<>":"td","html":"<a href='${policyUrl}'>LINK</a>"}]}

]}

const stringStart = 
`
<table id="purposes-table" class="uk-table uk-table-hover uk-table-divider">
    <thead>
        <tr>
            <td>Name</td>
            <td>Policy</td>
        </tr>
    </thead>
`

const stringEnd = 
`
</table>
`

let output = json2html.transform(vendors, mini);
let concat = stringStart + output + stringEnd

//var header = output.createTHead();

console.log(concat);

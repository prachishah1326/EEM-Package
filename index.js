const moment =  require('moment');
const todayDate = moment().subtract(12, 'M').format('YYYY-MM-DD').toString();
const dateparams = `javascript:gs.dateGenerate('${todayDate}','23:59:59')`;
const optionsAuth = { user: `${process.env.SNOW_USERNAME}`, password: `${process.env.SNOW_PASSWORD}` };
const restClient = require('node-rest-client').Client;
const client = new restClient(optionsAuth);


function snowApi(table,group,parameters) {
  const defaultParmeters=["number","state","assigned_to","priority","severity","short_description","opened_at","closed_at","assignment_group","u_ci_class_filter","cmdb_ci"]
  const  snowUrl =  `${process.env.SNOW_URL}`;
  const parameters = (parameters.length !== 0?paarameters:defaultParmeters);
  snowUrl = snowUrl.replace('${parameters}',parameters.join(",")).replace('${table}',table).replace('${dateparams}',dateparams).replace('${group}',group)
  try{
    client.get(snowUrl, (data) => {
      if(data.result != undefined){
          const items = data.result;
          console.log(snowUrl);
          console.log("data "+items);
          var reqItems = [];
          for (let i = 0; i < items.length; i++) {
            var row = {};
            parameters.forEach(element =>{
                row[element] = items[i][element]
            })
            reqItems.push(row);
          }
          return reqItems
      }
      else{
        console.log(data.error);
        return data.error;
      }
    });
  }catch(err){
    console.log(err)
  }
}

module.exports={
  snowApi:snowApi
}
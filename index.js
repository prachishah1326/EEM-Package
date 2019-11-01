const moment =  require('moment');
const todaydate = moment().subtract(12, 'M').format('YYYY-MM-DD').toString();

const dateparams = `javascript:gs.dateGenerate('${todaydate}','23:59:59')`;

const optionsAuth = { user: `${process.env.SNOW_USERNAME}`, password: `${process.env.SNOW_PASSWORD}` };

const Client = require('node-rest-client').Client;

const client = new Client(optionsAuth);

function dataList( management,group) {
  
  var  url =  `${process.env.SNOW_URL}`;
  url = url.replace('${management}',management).replace('${dateparams}',dateparams).replace('${group}',group)
  try{

    client.get(url, (data1) => {
      const items = data1.result;
      console.log(url);
      console.log("data "+items);
      console.log("item: "+JSON.parse(JSON.stringify(data1)));
      console.log("json"+JSON.stringify(data1));
      const reqItems = [];
      if(items !==undefined){
      for (let i = 0; i < items.length; i++) {
        const row = {};

        row.ticket_number = items[i].number.toString();

        if (items[i].short_description) {
          row.short_description = items[i].short_description;
        } else {
          row.short_description = null;
        }

        if (items[i].opened_at) {
          row.opend_at = moment(items[i].opened_at).format('DD/MM/YYYY');
        } else {
          row.opend_at = null;
        }
        if (items[i].opened_at === items[i].closed_at) {
          row.isOpenCloseSame = true;
        }
        if (items[i].state) {
          row.state = items[i].state;
        } else {
          row.state = null;
        }

        if (items[i].time_worked) {
          row.time_worked = items[i].time_worked;
        } else {
          row.time_worked = '-';
        }
        if (items[i].u_ci_class_filter  && items[i].u_ci_class_filter !== 'null') {
          row.classfilter = items[i].u_ci_class_filter;
        } else {
          row.classfilter = '';
        }
        if (items[i].cmdb_ci && items[i].cmdb_ci.display_value !== null) {
          row.cmdbci  = items[i].cmdb_ci.display_value;
        } else {
          row.cmdbci  = '';
        }

        reqItems.push(row);
      }

      return reqItems
    }
    else{
     return {}
    }
    });
  }catch(err){
    console.log("err")
    
  }
}

module.exports={
    dataList:dataList
}
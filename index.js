/* eslint-disable no-loop-func */
/* eslint-disable no-var */
const moment = require('moment');

const todayDate = moment().subtract(12, 'M').format('YYYY-MM-DD').toString();
const dateparams = `javascript:gs.dateGenerate('${todayDate}','23:59:59')`;
const optionsAuth = { user: `${process.env.SNOW_USERNAME}`, password: `${process.env.SNOW_PASSWORD}` };
const RestClient = require('node-rest-client').Client;

const client = new RestClient(optionsAuth);


function snowApi(table, parameterList) {
  var row;
  const defaultParmeters = ['number', 'state', 'assigned_to', 'priority', 'severity', 'short_description', 'opened_at', 'closed_at', 'assignment_group', 'u_ci_class_filter', 'cmdb_ci'];
  let snowUrl = `${process.env.SNOW_URL}`;
  const parameters = (parameterList.length !== 0 ? parameterList : defaultParmeters);
  snowUrl = snowUrl.replace('{parameters}', parameters.join(',')).replace('{tablename}', table).replace('{dateparams}', dateparams).replace('{groupname}', process.env.GROUP_NAME);
  try {
    client.get(snowUrl, (data) => {
      if (data.result !== undefined) {
        const items = data.result;
        const reqItems = [];
        for (let i = 0; i < items.length; i++) {
          row = {};
          parameters.forEach((element) => {
            row[element] = (items[i][element] ? items[i][element] : null);
          });
          reqItems.push(row);
        }
        return reqItems;
      }

      console.log(data.error);
      return data.error;
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  snowApi,
};

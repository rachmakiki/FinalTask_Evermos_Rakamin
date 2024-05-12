import http from "k6/http";
import { check,sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
    vus: 1000,
    iterations: 3500,
    thresholds: {
        http_req_duration: ['max<2000']
    }
};

export default function() {
//API CREATE user with POST
    const postUrl = 'https://reqres.in/api/users';    
    let payload = JSON.stringify({
        name: 'morpheus',
        job: 'leaders'
    });
    let headers = {'Content-Type': 'application/json'};
    const postRes = http.post(postUrl, payload, headers);
    check(postRes, {
        'POST response code was 201': (res) => res.status == 201
    });

sleep(1);

//API UPDATE user with PUT
    const putUrl = 'https://reqres.in/api/users/2';
    payload = JSON.stringify({
        name: 'morpheus',
        job: 'zion resident'
    });
    headers = {'Content-Type':'application/json'};
    let putRes = http.put(putUrl, payload, headers);
    check(putRes, {
        'PUT response code was 200': (res) => res.status == 200
    });
    sleep(1);
}

export function handleSummary(data) {
    return {
      "report.html": htmlReport(data),
    };
}

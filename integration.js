import http from "k6/http";
import { check, sleep } from "k6";


export default function(){
//API CREATE user with POST
    let payload = JSON.stringify({
        name: 'morpheus',
        job: 'leaders'
    });
    let headers = { 'Content-Type': 'application/json' };
    let postRes = http.post('https://reqres.in/api/users', payload, headers);
    check(postRes, {
        'POST response code was 201': (res) => res.status == 201
    });

sleep(1);

//API UPDATE user with PUT

    payload = JSON.stringify({
        name: 'morpheus',
        job: 'zion resident'
    });
    headers = { 'Content-Type':'application/json' };
    let putRes = http.put('https://reqres.in/api/users/2', payload, headers);
    check(putRes, {
        'PUT response code was 200': (res) => res.status == 200
    });
    sleep(1);
}
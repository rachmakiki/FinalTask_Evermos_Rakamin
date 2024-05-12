import http from "k6/http";
import { check } from "k6";

export default function() {
    const payload = JSON.stringify({
        name: 'morpheus',
        job: 'zion resident'
    });
    const headers = {'Content-Type': 'application/json'};
    const res = http.put('https://reqres.in/api/users/2', payload, headers);
    check(res,{
        'response code was 200': (res) => res.status == 200,
    });
}
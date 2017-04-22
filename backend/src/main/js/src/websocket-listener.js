/**
 * Created by Qi on 3/13/17.
 */

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function register(registrations) {
    var socket = SockJS('http://localhost:8080/status'); // <3>
    var stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        registrations.forEach(function (registration) { // <4>
            stompClient.subscribe(registration.route, registration.callback);
        });
    });
}

module.exports.register = register;


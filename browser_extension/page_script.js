
var _action_collector_extension_action_buf = new Array();
var _action_collector_extension_last_action_time = Date.now()

let get_mouse_event_field = (
    {altKey, bubbles, button, buttons, cancelBubble, cancelable, clientX, clientY, composed, ctrlKey, defaultPrevented, detail, eventPhase, isTrusted, layerX, layerY, metaKey, movementX, movementY, offsetX,offsetY, pageX, pageY, returnValue, screenX, screenY, shiftKey, timeStamp, type, which, x, y}
    ) => (
        {altKey, bubbles, button, buttons, cancelBubble, cancelable, clientX, clientY, composed, ctrlKey, defaultPrevented, detail, eventPhase, isTrusted, layerX, layerY, metaKey, movementX, movementY, offsetX,offsetY, pageX, pageY, returnValue, screenX, screenY, shiftKey, timeStamp, type, which, x, y})

let get_wheel_event_field = (
    {altKey, bubbles, button, buttons, cancelBubble, cancelable, clientX, clientY, composed, ctrlKey, defaultPrevented, deltaMode, deltaX, deltaY, deltaZ, detail, eventPhase, isTrusted, layerX, layerY, metaKey, movementX, movementY, offsetX,offsetY, pageX, pageY, returnValue, screenX, screenY, shiftKey, timeStamp, type, wheelDelta, wheelDeltaX, wheelDeltaY, which, x, y}
    ) => (
        {altKey, bubbles, button, buttons, cancelBubble, cancelable, clientX, clientY, composed, ctrlKey, defaultPrevented, deltaMode, deltaX, deltaY, deltaZ, detail, eventPhase, isTrusted, layerX, layerY, metaKey, movementX, movementY, offsetX,offsetY, pageX, pageY, returnValue, screenX, screenY, shiftKey, timeStamp, type, wheelDelta, wheelDeltaX, wheelDeltaY, which, x, y})

let get_keyboard_event_field = (
    {altKey, bubbles, cancelBubble, cancelable, composed, ctrlKey, defaultPrevented, eventPhase, isComposing, isTrusted, metaKey, repeat, returnValue, shiftKey, timeStamp, type}
    ) => (
        {altKey, bubbles, cancelBubble, cancelable, composed, ctrlKey, defaultPrevented, eventPhase, isComposing, isTrusted, metaKey, repeat, returnValue, shiftKey, timeStamp, type})


function send_result(data){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:9988", true);
    xhr.send(JSON.stringify(data))
}

function change_buffer_and_send(){
    if (_action_collector_extension_action_buf.length === 0){return}
    
    old_actions = _action_collector_extension_action_buf
    _action_collector_extension_action_buf = new Array()
    pro = new Promise(function(resolve, reject){
        send_result(old_actions)
        resolve()
    })
    pro.then((e)=>{})
}

function mouse_event_handler(e) {
    now = Date.now()
    if (now - _action_collector_extension_last_action_time > 500){
        change_buffer_and_send()
    }
    if (e instanceof WheelEvent){
        var ret = get_wheel_event_field(e)
    }else if(e instanceof MouseEvent){
        var ret = get_mouse_event_field(e)
    }else if(e instanceof KeyboardEvent){
        var ret = get_keyboard_event_field(e)
    }
    _action_collector_extension_last_action_time = now
    _action_collector_extension_action_buf.push(ret)

}

function unload_handler(e){
    change_buffer_and_send()
}

document.addEventListener('mousedown', mouse_event_handler.bind(this),{passive: true, capture:true})
document.addEventListener('mousemove', mouse_event_handler.bind(this),{passive: true, capture:true})
document.addEventListener('mouseup', mouse_event_handler.bind(this),{passive: true, capture:true})
document.addEventListener('wheel', mouse_event_handler.bind(this),{passive: true, capture:true})

document.addEventListener('keydown', mouse_event_handler.bind(this),{passive: true, capture:true})
document.addEventListener('keypress', mouse_event_handler.bind(this),{passive: true, capture:true})
document.addEventListener('keyup', mouse_event_handler.bind(this),{passive: true, capture:true})

window.addEventListener('beforeunload', unload_handler.bind(this),{passive: true, capture:true})
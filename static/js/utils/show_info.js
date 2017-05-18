function convertArguments(arguments) {
    var args = Array.prototype.slice.call(arguments).slice();
    args = [].slice.call(args);
    args = args[0];
    return args;
}

function inspect(object) {
    if (object != null) {
        object = convertArguments(object);
        // var m = "mark: ";
        // console.log({m, object});
        // object = convertArguments;
        // console.log(object);
        console.log({object}.object);
    }
}

function tog() {
    toggleLocalStorageVar("debug");
}

function toggleLocalStorageVar(v) {
    localStorage.setItem(v, !(localStorage.getItem(v) === 'true'));
    console.log(v + "is: ");
    console.log(!(localStorage.getItem(v) === 'true'));
    console.log("---");
}

function ShowInfo() {
    // TODO Contribute a library like this to datGUI.js !!!! :)
    // TODO Contribute a library like this to datGUI.js !!!! :)
    // TODO Contribute a library like this to datGUI.js !!!! :)
    // TODO Contribute a library like this to datGUI.js !!!! :)
    // TODO Contribute a library like this to datGUI.js !!!! :)
    // TODO Contribute a library like this to datGUI.js !!!! :)
    // TODO Contribute a library like this to datGUI.js !!!! :)
    //
    // Contribute as a port of this, and then

    // make this an object, so you can attach multiple versions of it!

    // function showInfo(override) {
    function showInfo_helper(helperObject) {
        // var a = inspect(arguments);
        // inspect(a);
        // console.log(arguments);
        // console.log("------");
        // console.log(helperObject);
        // inspect(helperObject);
        // console.log("--2----");
        // inspect(arguments);
        // console.log("------");
        var arg = convertArguments(arguments);

        for (param in arg) {
            // console.log(arg[0]);
            // var prefix = "show_info_";
            var prefix = "";
            // console.log(prefix + param + " -- is: ");
            // console.log( != "true");
            var x = " | ";
            var thing = helperObject[arg];


            if (localStorage.getItem(prefix + param) != 'true') {
                // param = localStorage + " " + prefix + param + " -- is: ";
                // localStorage.setItem(prefix + param, false);
                param = localStorage[param];
                // console.log({param});
                console.log("wow: ");
                // console.log(localStorage.getItem(prefix + param) != null);
                return param;
            } else {
                console.log("woweee: ");
                localStorage.setItem(prefix + param, false);
                // localStorage[param] = ;
                console.log("ohhhhh");
                arguments[param] = (localStorage.getItem(prefix + param) == true);
            }
        }
        return arguments;
        // if (override === null) (override = false); a
        // show = (localStorage.getItem("show_disply") = true)  && (((document.location.hostname !== "127.0.0.1" || document.location.hostname !== "localhost")) ? true : false);
        // ^^^ add these back in!




        // // No arguments means defaulting to the other function
        // console.log(arguments);
        // // return 0;
        // if (override === null) (override = false);
        // show = (localStorage.getItem("show_disply") = true)  && (((document.location.hostname !== "127.0.0.1" || document.location.hostname !== "localhost")) ? true : false);
        // console.log(show);
        //
        // return helperObject;
    }

    this.showInfo = function(object) {
        if (object == null) return;

        // var object = convertArguments(object);

        for (index in object) {
            object[index] = index && (localStorage.getItem(index) == "true");
        }
        return object;
       //  var ret = showInfo_helper(object);
       //  document.addEventListener("onload", ret)
       //
       //  // attach listerner objects to the object as well as to localstoragechagne of this name
       //
       // // then you can  
       //  // localStorage.setItem("show_info_debug", !(localStorage["show_info_debug"] == 'true')); localStorage["show_info_debug"]
       //
       //
       //  return {};
    }
}

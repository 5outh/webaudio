// Generated by psc version 0.6.4.1
var PS = PS || {};
PS.Prelude = (function () {
    "use strict";
    
    function showNumberImpl(n) {
      return n.toString();
    }
    ;
    
    function numAdd(n1) {
      return function(n2) {
        return n1 + n2;
      };
    }
    ;
    
    function numSub(n1) {
      return function(n2) {
        return n1 - n2;
      };
    }
    ;
    
    function numMul(n1) {
      return function(n2) {
        return n1 * n2;
      };
    }
    ;
    
    function numDiv(n1) {
      return function(n2) {
        return n1 / n2;
      };
    }
    ;
    
    function numMod(n1) {
      return function(n2) {
        return n1 % n2;
      };
    }
    ;
    
    function numNegate(n) {
      return -n;
    }
    ;
    var Show = function (show) {
        this.show = show;
    };
    var Num = function ($percent, $times, $plus, $minus, $div, negate) {
        this["%"] = $percent;
        this["*"] = $times;
        this["+"] = $plus;
        this["-"] = $minus;
        this["/"] = $div;
        this.negate = negate;
    };
    var $plus = function (dict) {
        return dict["+"];
    };
    var $times = function (dict) {
        return dict["*"];
    };
    var showNumber = new Show(showNumberImpl);
    var show = function (dict) {
        return dict.show;
    };
    var numNumber = new Num(numMod, numMul, numAdd, numSub, numDiv, numNegate);
    return {
        Num: Num, 
        Show: Show, 
        "*": $times, 
        "+": $plus, 
        show: show, 
        showNumber: showNumber, 
        numNumber: numNumber
    };
})();
var PS = PS || {};
PS.Math = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var sqrt = Math.sqrt;;
    return {
        sqrt: sqrt
    };
})();
var PS = PS || {};
PS.Debug_Trace = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    
    function trace(s) {
      return function() {
        console.log(s);
        return {};
      };
    }
    ;
    var print = function (__dict_Show_16) {
        return function (o) {
            return trace(Prelude.show(__dict_Show_16)(o));
        };
    };
    return {
        print: print, 
        trace: trace
    };
})();
var PS = PS || {};
PS.TestModule = (function () {
    "use strict";
    var Debug_Trace = PS.Debug_Trace;
    var Prelude = PS.Prelude;
    var Math = PS.Math;
    var main = Debug_Trace.print(Prelude.showNumber)(9000);
    return {
        main: main
    };
})();
var PS = PS || {};
PS.Chapter2 = (function () {
    "use strict";
    var Math = PS.Math;
    var Debug_Trace = PS.Debug_Trace;
    var Prelude = PS.Prelude;
    var diagonal = function (w) {
        return function (h) {
            return Math.sqrt(w * w + h * h);
        };
    };
    var main = Debug_Trace.print(Prelude.showNumber)(diagonal(3)(4));
    return {
        main: main, 
        diagonal: diagonal
    };
})();
PS.TestModule.main();
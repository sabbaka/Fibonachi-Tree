var fib = function(x) {
    var fib = [0,1];
    for(var i = 0; i < x; i++) {
        fib.push(fib[i]+fib[i+1])
    }
    return fib[x];
};

y = fib(50);

function fib_rec(x) {
    if(x == 0 || x == 1) {
        return x;
    }
    else {
        return fib_rec(x-1) + fib_rec(x-2);
    }
}

y = fib(3);

var nodes = [
    {
        "id" : "1",
        "parent_id" : "3" },
    {
        "id" : "2",
        "parent_id" : "3" },
    {
        "id" : "3",
        "parent_id" : "5" },
    {
        "id" : "4",
        "parent_id" : "5" },
    {
        "id" : "5"
    },
    {
        "id" : "6"
    }
];


function find_child(id, nodes) {
    var result = [];
    for(var i = 0; i < nodes.length; i++ ) {
        if(nodes[i].parent_id == id) {
            delete nodes[i].parent_id;
            result.push(nodes[i]);
        }
    }
    if(result == []) {
        return false;
    }
    else {
        return result;
    }
}

var result = [];
for (var i = 0; i < nodes.length; i++) {
    if(!('parent_id' in nodes[i])){
        result.push(nodes[i]);
    }
}
for(var i = 0; i < result.length; i++) {
    result[i].children = find_child(result[i].id, nodes);
}

for(var i = 0; i < result.length; i++) {
    var current = result[i].children;
    for(k in current) {
        current[k].children = find_child(current[k].id, nodes);
    }
}

console.log(JSON.stringify(result));

$('document').ready(function() {

    function make_div_tree(result) {
        var content = "";
        for (key in result) {
            if (result[key]) {
                content+='<div class="box" id="'+result[key].id+'">'+result[key].id;
                if (result[key].children)
                {
                    content+=make_div_tree(result[key].children);
                }
                content+="</div>";
            }
        }
        return content;
    }

    $('#my').prepend(make_div_tree(result));
});

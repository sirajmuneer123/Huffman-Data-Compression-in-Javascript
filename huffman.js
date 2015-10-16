var codes={};
var str="aaabccdeeeeeffg";
function frequency(str){
    freqs = {}
    for(var i=0;i<str.length;i=i+1)
        freqs[str[i]]=0;
    for(var j=0;j<str.length;j++)
	freqs[str[j]]+=1;
    return freqs;
}
f_freq=frequency(str);
//console.log(f_freq);

function forSort(a,b){
    return a[0]-b[0];
}
function sortFreq(freqs){
    letters=Object.keys(freqs);
    tuples=[];
    for(var i=0;i<letters.length;i++){
       	tuples.push([freqs[letters[i]],letters[i]]);
    }
    tuples.sort(forSort);
    return tuples;

}
f_sortFreq=sortFreq(f_freq);
//console.log(f_sortFreq);

function buildTree(tuples){
    while(tuples.length>1){
	var leastTwo = tuples.slice(0,2);
	var theRest = tuples.slice(2,tuples.length);
	var combFreq=leastTwo[0][0] + leastTwo[1][0];

	tuples = theRest;
	var temp=[combFreq,leastTwo];
	tuples.push(temp);
	tuples.sort(forSort);
	
    }
    return tuples[0];	

}
f_buildTree=buildTree(f_sortFreq);
//console.log(f_buildTree);

function trimTree(tree)
{
    var p = tree[1];
    if (typeof p === typeof '')
	return p;
    else
        return (Array(trimTree(p[0]),trimTree(p[1])));
}

f_trimTree=trimTree(f_buildTree);
//console.log(f_trimTree);

function assignCode(node,pat){
    pat=pat || '';
    if (typeof node ==typeof '')
	codes[node]=pat;
    else{
	assignCode(node[0],pat+'0');
	assignCode(node[1],pat+'1');
    }
    return codes;

}
f_aCode=assignCode(f_trimTree)
//console.log(f_aCode);

function encode(str){
    output= '';
    for(ch in str){
	output +=codes[str[ch]];
    }
    return output;
}
f_encode=encode(str);
console.log(f_encode);

function decode(tree,str){
    output='';
    var p=tree;
    for(bit in str){
	if(str[bit]=='0')
		p=p[0];
	else
		p=p[1];
	if(typeof p== typeof ''){
		output +=p;
		p=tree;
	}
    }
    return output;

}
f_decode=decode(f_trimTree,f_encode);
console.log(f_decode);

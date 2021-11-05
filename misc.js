var callAPI = (Dates,Diapers,PlasticBag,Clothes,Towel,Bib,Underwear,Gauze)=>{
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({
                                "OperationType":"PUT",
                                "Keys":{
                                    "Date":Dates,
                                    "Diapers":Diapers,
                                    "PlasticBag":PlasticBag,
                                    "Clothes":Clothes,
                                    "Towel":Towel,
                                    "Bib":Bib,
                                    "Underwear":Underwear,
                                    "Gauze":Gauze
                                }
                            });
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://x93z0077i6.execute-api.us-west-2.amazonaws.com/dev/dynamodbctrl", requestOptions)
    .then(response => response.text())
    .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('error', error));
}
var OnClick = ()=>{
    const Diapers_sel       = document.form1.Diapers;
    const PlasticBag_sel    = document.form1.PlasticBag;
    const Clothes_sel       = document.form1.Clothes;
    const Towel_sel         = document.form1.Towel;
    const Bib_sel           = document.form1.Bib;
    const Underwear_sel     = document.form1.Underwear;
    const Gauze_sel         = document.form1.Gauze;

    const Diapers       = Diapers_sel.options[Diapers_sel.selectedIndex].value;
    const PlasticBag    = PlasticBag_sel.options[PlasticBag_sel.selectedIndex].value;
    const Clothes       = Clothes_sel.options[Clothes_sel.selectedIndex].value;
    const Towel         = Towel_sel.options[Towel_sel.selectedIndex].value;
    const Bib           = Bib_sel.options[Bib_sel.selectedIndex].value;
    const Underwear     = Underwear_sel.options[Underwear_sel.selectedIndex].value;
    const Gauze         = Gauze_sel.options[Gauze_sel.selectedIndex].value;

    callAPI(
            GetDate(),
            Diapers,
            PlasticBag,
            Clothes,
            Towel,
            Bib,
            Underwear,
            Gauze);
}
var GetDate = ()=>{
    var hiduke  =new Date();
    dt  = formatDate(hiduke);
    document.getElementById('Dates').innerHTML  = dt;
    return dt;
}
function formatDate(dt){
    var y   = dt.getFullYear();
    var m   = ('00'+(dt.getMonth()+1)).slice(-2);
    var d   = ('00'+dt.getDate()).slice(-2);
    return y+'/'+m+'/'+d;
}
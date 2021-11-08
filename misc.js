var DiapersStd;
var PlasticBagStd;
var ClothesStd;
var TowelStd;
var BibStd;
var UnderwearStd;
var GauzeStd;

var Post_Put = (Dates,Diapers,PlasticBag,Clothes,Towel,Bib,Underwear,Gauze)=>{
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
var Post_Get = (Dates)=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"OperationType":"QUERY",
                                "Keys":{
                                    "Date":Dates
                                }});
    var requestOptions = {
        method : 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    var ret;
    // console.log(JSON.stringify(requestOptions, null, 2));
    return fetch("https://x93z0077i6.execute-api.us-west-2.amazonaws.com/dev/dynamodbctrl", requestOptions)
}
var Register_OnClick = ()=>{
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

    Post_Put(
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
var GetStandard = ()=>{
    const ret = Post_Get('Standard');
    // console.log(ret);
    // const json = await ret.json();
    ret.then(function (response) {
        return response.json();
    })
    .then(function (json){
        var jsonObject  = JSON.parse(JSON.stringify(json));
        // console.log(jsonObject.Items[0].Diapers);
        DiapersStd      = document.form1.DiapersStd.value     = jsonObject.Items[0].Diapers;
        PlasticBagStd   = document.form1.PlasticBagStd.value  = jsonObject.Items[0].PlasticBag;
        ClothesStd      = document.form1.ClothesStd.value     = jsonObject.Items[0].Clothes;
        TowelStd        = document.form1.TowelStd.value       = jsonObject.Items[0].Towel;
        BibStd          = document.form1.BibStd.value         = jsonObject.Items[0].Bib;
        UnderwearStd    = document.form1.UnderwearStd.value   = jsonObject.Items[0].Underwear;
        GauzeStd        = document.form1.GauzeStd.value       = jsonObject.Items[0].Gauze;
    });
}
var SetStandard = ()=>{
    DiapersStd       = document.form1.DiapersStd.value;
    PlasticBagStd    = document.form1.PlasticBagStd.value;
    ClothesStd       = document.form1.ClothesStd.value;
    TowelStd         = document.form1.TowelStd.value;
    BibStd           = document.form1.BibStd.value;
    UnderwearStd     = document.form1.UnderwearStd.value;
    GauzeStd         = document.form1.GauzeStd.value;
    Post_Put(
        'Standard',
        DiapersStd,
        PlasticBagStd,
        ClothesStd,
        TowelStd,
        BibStd,
        UnderwearStd,
        GauzeStd
    )
}
var GetItems = ()=>{
    var dt = new Date();
    QueryItems(dt);
}
function QueryItems(date){
    const ret = Post_Get(formatDate(date));
    bool = ret.then(function (response) {
        return response.json();
    })
    .then(function (json){    
        var jsonObject  = JSON.parse(JSON.stringify(json));   
        console.log(jsonObject); 
        if (jsonObject.Count != 0){
            // console.log(jsonObject.Items[0].Diapers);        
            document.getElementById("DiapersNum").innerHTML     = DiapersStd - jsonObject.Items[0].Diapers;
            document.getElementById("PlasticBagNum").innerHTML  = PlasticBagStd - jsonObject.Items[0].PlasticBag;
            document.getElementById("ClothesNum").innerHTML     = ClothesStd - jsonObject.Items[0].Clothes;
            document.getElementById("TowelNum").innerHTML       = TowelStd - jsonObject.Items[0].Towel;
            document.getElementById("BibNum").innerHTML         = BibStd - jsonObject.Items[0].Bib;
            document.getElementById("UnderwearNum").innerHTML   = UnderwearStd - jsonObject.Items[0].Underwear;
            document.getElementById("GauzeNum").innerHTML       = GauzeStd - jsonObject.Items[0].Gauze;
        }
        else{
            date.setDate(date.getDate()-1);
            QueryItems(date);
        }
    });
}
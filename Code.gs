const SHEET_NAME = "Scores";

function getSheet_(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if(!sh){
    sh=ss.insertSheet(SHEET_NAME);
    sh.appendRow(["timestamp","sessionId","classCode","name","score","level","coins","accuracy","attempts","correct","bestStreak","status"]);
  }
  return sh;
}

function doPost(e){
  const body=JSON.parse((e.postData&&e.postData.contents)||"{}");
  const sh=getSheet_();
  const data=sh.getDataRange().getValues();
  // Update an existing session row instead of creating hundreds of duplicate rows.
  for(let r=1;r<data.length;r++){
    if(String(data[r][1])===String(body.sessionId) && body.sessionId){
      sh.getRange(r+1,1,1,12).setValues([[
        new Date(),body.sessionId||"",body.classCode||"",body.name||"Student",
        Number(body.score)||0,Number(body.level)||0,Number(body.coins)||0,
        Number(body.accuracy)||0,Number(body.attempts)||0,Number(body.correct)||0,
        Number(body.streakBest)||0,body.status||"in_progress"
      ]]);
      return ContentService.createTextOutput(JSON.stringify({ok:true,updated:true})).setMimeType(ContentService.MimeType.JSON);
    }
  }
  sh.appendRow([new Date(),body.sessionId||"",body.classCode||"",body.name||"Student",
    Number(body.score)||0,Number(body.level)||0,Number(body.coins)||0,
    Number(body.accuracy)||0,Number(body.attempts)||0,Number(body.correct)||0,
    Number(body.streakBest)||0,body.status||"in_progress"]);
  return ContentService.createTextOutput(JSON.stringify({ok:true,created:true})).setMimeType(ContentService.MimeType.JSON);
}

function doGet(){
  const sh=getSheet_(), rows=sh.getDataRange().getValues(), out=[];
  for(let i=1;i<rows.length;i++) out.push({
    date:String(rows[i][0]),sessionId:String(rows[i][1]),classCode:String(rows[i][2]),
    name:String(rows[i][3]),score:Number(rows[i][4]),level:Number(rows[i][5]),
    coins:Number(rows[i][6]),accuracy:Number(rows[i][7]),attempts:Number(rows[i][8]),
    correct:Number(rows[i][9]),bestStreak:Number(rows[i][10]),status:String(rows[i][11])
  });
  out.sort((a,b)=>b.score-a.score);
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}

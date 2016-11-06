// return most 
function accumulate(input, tree) {
  if (input.length === 0 || !(input[0] in tree)) {
    return { 'py': tree.py || "__   ",
             'remainder': input,
           };
  } else {
    return accumulate(input.substring(1), tree[input[0]]);
  }
}

function fallback() {
  // when input breaks up in the middle of a 4-character word, for example
}

function convert(input) {
  var output = "";
  var remainder = input;
  while (remainder !== "") {
    if (!(remainder[0] in cedict_tree)) {
      output += remainder[0] + " ";
      remainder = remainder.substring(1);
    } else {
      var accumResults = accumulate(remainder, cedict_tree);
      output += accumResults.py.slice(0, -2);
      remainder = accumResults.remainder;
    }
  }
  return output;
}

document.getElementById("convert").onclick = function() {
  document.getElementById("result").innerHTML =
    convert(document.getElementById("input").value);
};

// console.log(accumulate("xtz", cedict_tree));

// console.log(convert("樂一我女主一一對應"));

// console.log(convert("你好，你了解中文嗎？我快樂。聽音樂。"));

console.log(convert("明年傳統壽險保費要漲了。金管會保險局規畫，自明年一月一日起，除調降傳統台、外幣保單責任準備金利率外，還規定，壽險業銷售保單時不得有費差損，導致壽險業必須同步「降準、降佣」；在雙重效應下，保費漲幅約一到兩成，但繳費期間越短、還本性質高的終身壽險保費漲幅可能達到三成五日本皇太子德仁太子與太子妃雅子的獨生女敬宮愛子在她就讀的中學缺課一個多月，宮內廳發布消息，說是因為身體有恙。14歲的愛子9月26日開始沒上學，宮內廳官員說，放完了這個暑假，一連串考試，加上準備學校運動會，愛子不勝疲憊，10月6日住進「宮內廳病院」，但檢查結果沒有發現特別的健康問題，只是需要調養休息。宮內廳東宮大夫小田野展丈說，愛子也沒有整天賴床，會到花園裡活動活動，康復可能需要多一點時間，何時可以返校，尚未有譜。愛子暑假挺忙，8月1日跟雙親到東京出席一項儀式，11日到長野縣松本市參加「山之日」活動，行程滿滿。「山之日」宗旨是提倡全民愛山親山，2014年宣布，2016年正式制定，使11日成為8月唯一的國定假日，當天全國三教九流，政黨與民間組織共襄盛舉，隆重又熱鬧。愛子目前在東京就讀日本私立學習院中學三年級。她嬌貴之身應該不是挺健朗，小學二到四年級的階段就多次告假缺課。愛子是當今日本天皇明仁第一個皇孫。明仁有兩子，是德仁與其弟文仁，兩人俱無兒子，為保皇位傳承順暢，日本政府曾檢討皇位繼承規則〈皇室典範〉，考慮開放女子繼位。如此，則德仁踐祚之後，就是愛子。2006年，文仁先他哥哥生下兒子悠仁，悠仁成為皇位第三順位繼承人，皇位繼承危機解除，女子繼位問題就此擱置，若無大變，愛子應該是無緣皇位了。愛子嬌弱，媽媽似乎同病相憐。53歲的雅子10月下旬傳出由於日常庶務已不輕鬆，加上不勝照顧女兒之累，無法出席岩手縣全國殘障運動會的開幕典禮，由德仁單身前往。雅子另一不幸是長期為壓力及憂鬱症引起的疾病所苦，2003年以來定期治療。"));

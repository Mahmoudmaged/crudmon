for(i=0;i<parseInt($(".index").text());i++)
{
    if($(".article"+i).text().length>50)
        $(".article"+i).text($(".article"+i).text().substring(0, 50) + "...");
}
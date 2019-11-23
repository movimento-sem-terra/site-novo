<?php

function slugify($text)
{
  // replace non letter or digits by -
  $text = preg_replace('~[^\pL\d]+~u', '-', $text);

  // transliterate
  $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

  // remove unwanted characters
  $text = preg_replace('~[^-\w]+~', '', $text);

  // trim
  $text = trim($text, '-');

  // remove duplicate -
  $text = preg_replace('~-+~', '-', $text);

  // lowercase
  $text = strtolower($text);

  if (empty($text)) {
    return 'n-a';
  }

  return $text;
}


$row = 1;
if (($handle = fopen("out.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        if($row++ > 1) {
          $year = substr($data[2],0,4);
          $month = substr($data[2],5,2);
          $day = substr($data[2],8,2);
          $date = "$year/$month/$day/";

          if(!is_numeric($year) || !is_numeric($day) || !is_numeric($month)){
            continue;
          }

          $url = substr($data[2],11,strlen($data[2])-1);
          if (strcmp($url, slugify($data[5]))) {
            echo $date . $url . " ; https://mst.org.br/" . $date . slugify($data[5]) . "\n";
          }
        }
    }
    fclose($handle);
}
?>

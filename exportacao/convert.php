<?php

$DEBUG = False;

function getDirContents($dir, &$results = array()){
    $files = scandir($dir);

    foreach($files as $key => $value){
        $path = realpath($dir.DIRECTORY_SEPARATOR.$value);
        if(!is_dir($path)) {
            $results[] = $path;
        } else if($value != "." && $value != "..") {
            getDirContents($path, $results);
        }
    }

    return $results;
}

$files = getDirContents('/var/www/html/site-novo/_posts');
$dicionario_csv = ['content', 'id_SN', 'filename'];
$id_SN = 0;
$i = 0;
// $files = ['/var/www/html/site-novo/_posts/2017/12/2017-12-09-estudantes-da-ufrb-visitam-escola-do-mst-e-estabelecem-parceria.md'];

foreach ($files as $file) {


  # só importar após 2015
  $ano = (int)substr(pathinfo($file)['filename'], 0, 4);
  if($ano < 2015){
    continue;
  }

  //if($i++ > 100) {break;}

  $f = fopen($file, 'r');

  $meta = False;
  $active_field = False;
  $post = array(
    'id_SN' => $id_SN++,
    'filename' => pathinfo($file)['filename']
  );
  $subitens = [];

  while($line = fgets( $f )) {

    if($DEBUG) echo $line;
    # check meta marker
    preg_match('/^---$/', $line, $output);
    if ($output && !$meta) {
      $meta = True;
      // echo "Starting meta... \n";
      continue;
    }

    if ($output && $meta) {
      $meta = False;
      // echo "End meta \n";
      $post['content'] = "";
      if ($DEBUG) echo "0.1";
      continue;
    }

    if ($meta) {


      # subsubitem
      preg_match('/^    [\$]*(\w+): (.*)/', $line, $output);
      if ($output){
        // echo "*** $active_field >>> " . $output[1] . "\n";
        if ($DEBUG) echo "1";
        continue;
      }

      # test for item without subitem
      preg_match('/^([a-zA-Z-_]++): (.*)/', $line, $output);
      if ($output){
        // echo "Field: " . $output[1] . "\n";
        // echo "Value: " . $output[2] . "\n";

        $post[$output[1]] = $output[2];
        $last_key = $output[1];
        # verifica se o campo está no dicionário; senão inclui
        if (!in_array($output[1], $dicionario_csv)) {
          $dicionario_csv[] = $output[1];
        }
        if ($DEBUG) echo "2";
        continue;
      }


      # test for subitem
      if ($active_field) {

        # subitem sem nome
        preg_match('/^  - (.*)/', $line, $output);
        if ($output){

            # subitem com nome
            preg_match('/^  - (\w+): (.*)/', $line, $output2);
            if ($output2){
              // echo "$active_field >>> " . $output2[1] . ": ". $output2[2] . "\n";
              $subitens[] = $output2[2];
            } else {
              // echo "$active_field >>> " . $output[1] . "\n";
              $subitens[] = $output[1];
            }
            if ($DEBUG) echo "3";
            continue;

        } else {
          if ($DEBUG) echo "4";
          $post[$active_field] = implode("|", $subitens);
          $subitens = [];
          $active_field = False;
        }



      }

      # test for item with subitem
      preg_match('/^(\w+):$/', $line, $output);
      if ($output){
        // echo "Field with child: " . $output[1] . "\n";
        $active_field = $output[1];

        # verifica se o campo está no dicionário; senão inclui
        if (!in_array($output[1], $dicionario_csv)) {
          $dicionario_csv[] = $output[1];
        }

        continue;
      }

      # caso não tenha entrado em nenhuma condição antes, é continuação da linha anterior
      if (trim($line) != ""){
        // if (!array_key_exists($output[1], $post)){
        //   echo $line;
        //   echo $file;
        //   return;
        // }
        // echo $line;
        $post[$last_key] .= $line;
      }

    }

    if (!$meta) {
      $post['content'] .= $line;
    }

  }

  $posts[] = $post;

}

# a partir do dicionario, montar o csv
$output = NULL;
foreach ($posts as $i => $content) {
  $output[$i] = NULL;
  foreach ($dicionario_csv as $key) {
    if(array_key_exists($key, $content)){
      $c = str_replace('\"', '#', $content[$key]);

      $c = str_replace('\n', ' ', $c);
      $c = str_replace('src="//', 'src="https://', $c);
      $c = trim($c, '"');
      $c = str_replace('#', '"', $c);
      if($key == 'images_hd'){
	if (substr($content[$key],0,2) == "//"){
	    $c = str_replace('//farm', 'http://farm', $c);
	}
      }
      $output[$i][$key] = $c;
    } else {
      $output[$i][$key] = NULL;
    }
  }
}

$out = fopen("out.csv","w");
fputcsv($out,$dicionario_csv);
foreach ($output as $post) {
  fputcsv($out,$post);
}
fclose($out);

print_r($dicionario_csv);

?>

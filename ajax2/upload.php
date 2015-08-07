<?php

	/*本demo暂不支持中文文件名。*/
	$fileName = $_POST['fileName']; 
 	file_put_contents('uploads/'.$fileName, file_get_contents($_FILES["filePart"]["tmp_name"]), FILE_APPEND);
	echo json_encode(['status' => 200]);
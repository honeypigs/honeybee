<?php
/*本demo暂不支持中文文件名。*/

	$result = [
		"status" => 200,
	];
		

	$fileTureName =  $_GET['filename'];
	$fileTurePath = 'uploads/'.$fileTureName;

	//去掉文件扩展名，作为key
	$filePrefixName = substr($fileTureName, 0, strripos($fileTureName, '.'));  

	$result[$filePrefixName] = file_exists($fileTurePath) ? filesize($fileTurePath) : 0 ;
	
	echo json_encode($result);

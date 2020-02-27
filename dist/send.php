<?php

    /* 
        Список адресов
    */
    $recipients = array(
        "gmaxlev@gmail.com",
    );


    if (!isset($_POST['form'])) exit;

    $text_message ='';

    
    if ($_POST['form']=='calc'
        && isset($_POST['name'])
        && isset($_POST['phone'])
        && isset($_POST['size'])
        && isset($_POST['type'])
    ) {
        
  
        $form_name = htmlspecialchars(trim($_POST['name']));
        $form_phone = htmlspecialchars(trim($_POST['phone']));
        $form_size = htmlspecialchars(trim($_POST['size']));
        $form_type = htmlspecialchars(trim($_POST['type']));

        $text_message = "
            Имя: ".$form_name ." <br>
            Номер телефона: ".$form_phone." <br>
            Размер участка: ".$form_size." <br>
            Газон: ".$form_type." <br>
        ";
    }

    if ($_POST['form']=='call'
        && isset($_POST['name'])
        && isset($_POST['phone'])
    ) {
        
  
        $form_name = htmlspecialchars(trim($_POST['name']));
        $form_phone = htmlspecialchars(trim($_POST['phone']));

        $text_message = "
            Имя: ".$form_name ." <br>
            Номер телефона: ".$form_phone." <br>
        ";
    }
    
    
    $mail['charset'] = "utf-8";
    $mail['to'] = implode(',', $recipients);
    $mail['subject'] = 'Новое сообщение на сайте';
    $mail['massage'] = $text_message;
    
    $mail['header'] = "MIME-Version: 1.0\n"
    ."X-Priority: 3\n"
    ."X-Mailer: Mailer\n"
    ."Content-Transfer-Encoding: 8bit\n"
    ."Content-Type: text/html; charset=" . $mail['charset'] . "\n";
    
    mail ($mail['to'], $mail['subject'], $mail['massage'], $mail['header']);
    

?>
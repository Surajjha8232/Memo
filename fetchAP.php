<HTML>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="icon" type="image/png" href="images/favicon.png">

  <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
    integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous">
  </script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
  </script>
  <link href="css/bootstrap.css" type="text/css" rel="stylesheet">
  <link href="css/main.css" type="text/css" rel="stylesheet">
  <link href="css/style.css" type="text/css" rel="stylesheet">
  <script src="https://kit.fontawesome.com/437c69a092.js" crossorigin="anonymous"></script>
  <script src="js/bootstrap.js"></script>
  
  <title>Report</title>

</head>



<?php
//require('config/dbconnect.php');
require('database_connection.php');
//include('database_connection.php');
$_SESSION['username'] ='Test'; //$username;
$_SESSION['isDietician'] = 'Y'; //$row['isDietician'];
if(!isset($_SESSION['username'])) {
    //echo '<script>alert("You are not authenicated! Please Login"); window.location.href="login.php";</script>';
} 
//include_once('mynav.php');
$default=0;
$order="asc";
$patient_number="";

// Shridhar 2022-05-16
$AA_Gender=array("Male", "Female");
$AA_AgeGroup=array("less than 18", "18-40", "41-60", "60 Plus","NA");
$AA_co_morbidities=array('DM','HTN','Renal Impairment','Cardiac Ailment','Cancer','Hepatic Ailment','Pulmonary Ailment','Immunocompromised condition','Neurological impairment','Other');
$AA_Final_SGA_score=array('Well Nourished','Mildly malnourished','Moderately malnourished',' Severely malnourished');


$final_sga_score="";
$co_morbidities="";
$agegroup="";
$gender="";

$repcriteria="";

$filterclause=" (1=1) and "; 

// Shridhar 2022-05-16


if(isset($_POST['generate'])) {


// Shridhar 2022-05-16
	$final_sga_score=$_POST['final_sga_score'];
	$co_morbidities=$_POST['co_morbidities'];
	$agegroup=$_POST['agegroup'];
	$gender=$_POST['gender'];

//echo "check".$gender;
    $filterclause="( "; 

	if (strlen($gender)>0) { $filterclause=$filterclause. " gender='$gender' and ";$repcriteria=$repcriteria."/gender='$gender'"; }
	if (strlen($agegroup)>0) { $filterclause=$filterclause. " agegroup='$agegroup' and ";$repcriteria=$repcriteria."/agegroup='$agegroup'"; }
	if (strlen($co_morbidities)>0) { $filterclause=$filterclause. " co_morbidities like '%$co_morbidities%' and ";$repcriteria=$repcriteria."/co_morbidities='$co_morbidities'"; }
	if (strlen($final_sga_score)>0) { $filterclause=$filterclause. " final_sga_score like '$final_sga_score%' and ";$repcriteria=$repcriteria."/final_sga_score='$final_sga_score'"; }
    
	$filterclause=$filterclause." 1=1 ) and "; 
	
	$repcriteria=$repcriteria." / ";

// Shridhar 2022-05-16


  
  if(strcmp($_POST['patient_number'],"")>0){

    $patient_number = $_POST['patient_number'];
    $order = $_POST['order'];
    $sql = "SELECT * from form_diet_A where bhnumber like '%$patient_number%' or ipcnumber like '%$patient_number%' order by datetime $order";
    $sql = "SELECT * from Vw_FormA where ".$filterclause." (PatientCode like '%$patient_number%' or IPCaseNumber like '%$patient_number%' or PatientName like '%$patient_number%' ) order by FormA_Date $order";

// Shridhar 2022-05-16
	$repcriteria=$repcriteria." &nbsp;&nbsp;PatientCode / Name / IPCaseNumber matches :$patient_number";
// Shridhar 2022-05-16

	
    $result = sqlsrv_query( $connect, $sql ,array(), array( "Scrollable" => 'static' ));
  }else{
    $order = $_POST['order'];
    $from_date = $_POST['from_date'];
    $to_date = date('Y-m-d',strtotime($_POST['to_date']. '+1 day'));
    $tor_date = date('Y-m-d',strtotime($_POST['to_date']. '+0 day'));
    $default = 1;
    $sql = "SELECT * from form_diet_A where datetime >= '$from_date' and datetime <= '$to_date' order by datetime $order";
    $sql ="SELECT * from Vw_FormA where ".$filterclause." ( FormA_Date >= '$from_date' and FormA_Date <= '$to_date' ) order by FormA_Date $order";

// Shridhar 2022-05-16	
	$repcriteria=$repcriteria." Period : $from_date to $tor_date";
// Shridhar 2022-05-16	

    $result = sqlsrv_query( $connect, $sql ,array(), array( "Scrollable" => 'static' ));
  }
} else {
  $date = date("Y-m-d",strtotime('-1 day'));

  $sql = "SELECT * from form_diet_A where ".$filterclause." (datetime >= '$date') order by datetime desc";
  $sql = "SELECT * from Vw_FormA where ".$filterclause." (FormA_Date >= '$date') order by FormA_Date desc";
	
  
// Shridhar 2022-05-16	
  	$repcriteria=$repcriteria. " Period  >= $date";
// Shridhar 2022-05-16	
  
  $result = sqlsrv_query( $connect, $sql ,array(), array( "Scrollable" => 'static' ));
}

$result = sqlsrv_query( $connect, $sql, array(), array( "Scrollable" => 'static' ));
?>
  <br><br><br>

    <div class="container-fluid">

<div class="card shadow mb-4">
      <form class="form-inline" method="post" action="fetchA.php">

 <?php
//Shridhar 20220516
//$gender="Male";
echo '<div class="card-header">';
echo '<div class="d-flex justify-content-center align-items-center">';

echo'<B><I> Selection Filters:</B></i>';
echo' Gender:';
echo "<Select name='gender' class='custom-select mr-sm-2'>"; echo "<option value=''>Select-Gender</option>";
foreach($AA_Gender as $val)
{	if($val==$gender) {echo "<option value='$val' Selected >$val</option>";}
	else {echo "<option value='$val' >$val</option>";	}		
}
echo "</Select>";

//if(in_array($agegroup,$AA_AgeGroup)) {echo "found!!" ;echo "<option value='$val' Selected >$val</option>";}

//$agegroup="41-60";
echo' AgeGroup:';
echo "<Select name='agegroup' class='custom-select mr-sm-2'>"; echo "<option value=''>Select-AgeGroup</option>";
foreach($AA_AgeGroup as $val)
{ if($val==$agegroup) {echo "<option value='$val' Selected >$val</option>";}
	else {echo "<option value='$val' >$val</option>";	}		
}
echo "</Select>";



//$co_morbidities="Moderately malnourished";
echo' Co_morbidities:';
echo "<Select name='co_morbidities' class='custom-select mr-sm-2'>"; echo "<option value=''>Select-Co_morbidities</option>";
foreach($AA_co_morbidities as $val)
{ if($val==$co_morbidities) {echo "<option value='$val' Selected >$val</option>";}
	else {echo "<option value='$val' >$val</option>";	}		
}
echo "</Select>";

echo '</div></div>';
echo '<div class="card-header">';
echo '<div class="d-flex justify-content-center align-items-center">';


//$final_sga_score="Moderately malnourished";
echo' Final_SGA_score:';
echo "<Select name='final_sga_score' class='custom-select mr-sm-2'>"; echo "<option value=''>Select-Final_SGA_score</option>";
foreach($AA_Final_SGA_score as $val)
{ if($val==$final_sga_score) {echo "<option value='$val' Selected >$val</option>";}
	else {echo "<option value='$val' >$val</option>";	}		
}
echo "</Select>";


echo '</div></div>';
//Shridhar 20220516

?>

  <div class="card-header">
    <div class="d-flex justify-content-center align-items-center">
        <label for="patient_number" class="mr-sm-2"><b>Search by :</b> &nbsp;&nbsp;PatientCode / Name / IPCaseNumber</label>
        <input id="patient_number" class="form-control mr-sm-2" name="patient_number" type="text" value="">
        <label for="fdate" class="mr-sm-2"><b>or by DATE : </b>&nbsp;&nbsp;From :</label>
        <input id="fdate" class="form-control mr-sm-2" name="from_date" type="date" value="<?php if($default==0){echo date("Y-m-d",strtotime('-1 day'));} else {echo $from_date;} ?>" max="<?php echo date("Y-m-d",strtotime('-1 day'));?>">  
        <label for="tdate" class="mr-sm-2">To :</label>
        <input id="tdate" class="form-control mr-sm-2" name="to_date" type="date" value="<?php if($default==0){echo date("Y-m-d");} else {echo date('Y-m-d',strtotime($to_date. '-1 day'));} ?>" max="<?php echo date("Y-m-d");?>">
        <select name="order" class="custom-select mr-sm-2">
          <option value="asc" <?php if(strcmp($order,"asc")==0){echo 'selected';}?>>Ascending</option>
          <option value="desc" <?php if(strcmp($order,"desc")==0){echo 'selected';}?>>Descending</option>
        </select>
        <input class="btn btn-primary mr-sm-2" name="generate" type="submit" value="Generate">
      </form>
    </div>
  </div>
  <div class="card-body">
    <div class="table-responsive">
      <table class="table table-bordered" id="dataTable" width="100%"  border=1 cellspacing="1">
        <thead class="thead-light ">
        <h3 class="mb-4 font-weight-bold text-primary ">Final Nutrition Screening Form - A </h3>
        <h4 class="mb-4 font-weight-bold text-primary "><?php echo $repcriteria;?></h4>
        <!--<h4 class="mb-4 font-weight-bold text-primary "><?php echo $sql;?></h4> -->
          <tr>
            <?php
  //              if(strcasecmp($_SESSION['isDietician'],'M') != 0){
//                    echo "<th scope=\"col\">EDIT</th>";
//                }
            ?>
              <th scope="col"> BHNumber </th>
              <th scope="col">Patientname </th>
              <th scope="col">Age/Sex </th>
              <th scope="col">AgeGroup </th>
              <th scope="col">Gender </th>
              <th scope="col">DateTime</th>
              <th scope="col">Diagnosis</th>
              <th scope="col">Co_Morbidities</th>
              <th scope="col">Weight_Scoring</th>
              <th scope="col">Changes_in_Dietary</th>
              <th scope="col">GI_symptoms</th>
              <th scope="col">Functional_status</th>
              <th scope="col">Disease_Relation</th>
              <th scope="col">Muscle_Wasting</th>
              <th scope="col">Ascites_Oedema</th>
              <th scope="col">Final_SGA_score</th>
              <th scope="col">Nutrition_re_assessment</th>
              <th scope="col">Screening_done_by</th>
		 <th scope="col">PatientIPCaseNumber</th>
              
            
          </tr>
        </thead>
        <tbody>
        <?php
        if(sqlsrv_num_rows($result) > 0) 
        {       
          while($row = sqlsrv_fetch_array($result,SQLSRV_FETCH_ASSOC))
            {   
                $dbdatetime=$row['FormA_Date'];
                $newdatetime=date_format($dbdatetime,'Y-m-d');
               

                ?>
          <tr>
          <?php
            
                if(strcasecmp($_SESSION['isDietician'],'M') != 0){
                    $bhnumber = $row['PatientCode']; 
                    $ipcnumber = $row['IPCaseNumber'];
                    $patientname = $row['PatientName'];
                    $age_sex = $row['age_sex'];
                    echo '<td scope="row">
                            <form action="updateA.php" method="post">
                                <a class="btn btn-success"  name="edit" href="updateA.php?edit='.$bhnumber.'& ipcnumber='.$ipcnumber.' & pname='.$patientname.' & age_sex='.$age_sex.'">UPDATE</a>
                            </form>
                        </td>';
                }
            ?>
            <td><?php  echo $row['PatientCode']; ?></td>
            <td><?php  echo $row['PatientName']; ?></td>
            <td><?php  echo $row['age_sex']; ?></td>

            <td><?php  echo $row['AgeGroup']; ?></td>
            <td><?php  echo $row['Gender']; ?></td>

            <td><?php  echo $newdatetime; ?></td>
            <td><?php  echo $row['diagnosis']; ?></td>
            <td><?php  echo $row['co_morbidities']; ?></td>
            <td><?php  echo $row['weight_scoring']; ?></td>
            <td><?php  echo $row['changes_in_dietary']; ?></td>
            <td><?php  echo $row['GI_symptoms']; ?></td>
            <td><?php  echo $row['Functional_status']; ?></td>
            <td><?php  echo $row['disease_relation']; ?></td>
            <td><?php  echo $row['muscle_wasting']; ?></td>
            <td><?php  echo $row['Ascites_Oedema']; ?></td>
            <td><?php  echo $row['Final_SGA_score']; ?></td>
            <td><?php  echo $row['Nutrition_re_assessment']; ?></td>
            <td><?php  echo $row['Screening_done_by']; ?></td>
<td><?php  echo $row['IPCaseNumber']; ?></td>
            
          </tr>
            <?php   
            } 
        }  

        else 
        {
            echo "No Record Found";
        }
        ?>
        </tbody>
      </table>
   
    </div>
  </div>
</div>

</div>


</body>

</html>
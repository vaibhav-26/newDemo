import { Component, Inject,OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})



export class AddRequestComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public dialogueData:{seatNo:any , place:any , building:any},
  public dialog: MatDialog){}
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
 
  seatingPlace: any = {
    response: {
      building: [
        {
          name: 'Safal',
          place: [
            '1st Floor- Old office',
            '1st Floor- New office',
            '4th Floor',
            '7th Floor-Wing 1',
            '7th Floor-Wing 2',
            '7th Floor-Wing 3',
            '7th Floor-Wing 4',
            '7th Floor-Wing 5',
            '7th Floor-Wing 6'
          ]
        },
        {
          name: 'Scarlet',
          place: ['5th Floor', '6th Floor']
        }
      ]
    }
  } 
  building: any = this.seatingPlace.response.building
  selectedBuilding: any = ''
  selectedPlace: any = ''
  placeSelected: any 
  placeChosen: any

  matcher = new MyErrorStateMatcher();
  ngOnInit(): void{
    console.log("seatNo", this.dialogueData.seatNo);
    console.log('this.dialogueData.building',this.dialogueData.building);
    console.log('this.dialogueData.place',this.dialogueData.place);
  }
  
  onSelectingPlace (event: any) {
    this.placeSelected = event.target.innerText
    console.log('event::--->', event);
    console.log('this.placeSelected: ', this.placeSelected)
    console.log('event.target.value: ', event.target.innerText)
  }

  onSelectBuilding (event: any) {
    console.log('event::::', event)
    // let changeOthers = true
    // if (this.selectedBuilding == event) {
    //   changeOthers = false
    // }
    this.selectedBuilding = event
    console.log('this.selectedBuilding: ', this.selectedBuilding)

    const selectedBul = this.building.filter((item: any) => item.name == event)

    console.log({ selectedBul })
    this.placeChosen = selectedBul[0].place
    // for (let place of this.building) {
    //   console.log("sdfdsfsdfsdfs",this.selectedBuilding)
    //   if (place.name == this.selectedBuilding) {
    //     console.log('place.name: ', place.name);
    //     this.placeChosen = place.place
    //     console.log("place::::::;", place.place);
    //     // if (changeOthers) {
    //       // this.placeSelected
    //     // }
    //   }

    //   break
    // }
    // console.log('event::::::', event)
    // // console.log(
    // //   'this.seatingPlace::',
    // //   this.seatingPlace.response.building[0].place
    // // )
    // console.log('this.seatingPlace.response.place', this.seatingPlace.response)
    // let changeOthers = true
    // if (this.selectedBuilding == event) {
    //   changeOthers = false
    // }
    // this.selectedBuilding = event
    // console.log('this.selectedBuilding: ', this.selectedBuilding)
    // for (let seat of this.seatingPlace.response.building) {
    //   if (seat.name == this.selectedBuilding) {
    //     this.place = this.seatingPlace.response
    //     console.log('this.place1111:::--->', this.place)
    //   }
    //   if (changeOthers) {
    //     // this.place = this.seatingPlace.response.place[0]
    //     this.place = this.seatingPlace.response.building
    //     console.log('this.place2222222:::--->', this.place)
    //   }
    //   break
    // }
  }


  onCancelClick(){
    this.dialog.closeAll();
  }
}

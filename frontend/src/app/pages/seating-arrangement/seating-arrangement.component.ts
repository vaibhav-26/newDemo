import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddRequestComponent } from './add-request/add-request.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seating-arrangement',
  templateUrl: './seating-arrangement.component.html',
  styleUrls: ['./seating-arrangement.component.scss'],
})
export class SeatingArrangementComponent implements OnInit {
  constructor(public dialog: MatDialog, public router: Router) {}
  public seatConfig: any = null;
  seatObj: any;
  mapObj: any;
  public seatmap: any = [];
  public seatChartConfig: any = {
    showRowsLabel: true,
    showRowWisePricing: true,
    newSeatNoForRow: true,
  };
  public cart: any = {
    selectedSeats: [],
    seatstoStore: [],
    totalamount: 0,
    cartId: '',
    eventId: 0,
  };

  title = 'seat-chart-generator';
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
            '7th Floor-Wing 6',
          ],
        },
        {
          name: 'Scarlet',
          place: ['5th Floor', '6th Floor'],
        },
      ],
    },
  };

  building: any = this.seatingPlace.response.building;
  selectedBuilding: any = '';
  selectedPlace: any = '';
  placeSelected: any;

  // desk:any = this.seatingPlace.seating.building
  ngOnInit(): void {
    //Process a simple bus layout
    this.seatConfig = [
      // {
      // //   seat_price: 300,
      // //   seat_map: [
      // //     {
      // //       seat_label: 'N',
      // //       layout: '_____aaa_aaaaaaaaaaaaaa_aaaaaaaaaaaaaa_aaa_____________',
      // //     },
      // //     {
      // //       seat_label: 'M',
      // //       layout: '____aaaaa_aaaaaaaaaaaaa_aaaaaaaaaaaaaa_aaaaa___________',
      // //     },
      // //     {
      // //       seat_label: 'L',
      // //       layout: '___aaaaaa_aaaaaaaaaaaaa_aaaaaaaaaaaaaa_aaaaaaa_________',
      // //     },
      // //     {
      // //       seat_label: 'K',
      // //       layout: '__aaaaaaaa_aaaaaaaaaaaa_aaaaaaaaaaaaa__aaaaaaaa________',
      // //     },
      // //     {
      // //       seat_label: 'J',
      // //       layout: '_aaaaaaaaa_aaaaaaaaaaaa_aaaaaaaaaaaaa__aaaaaaaaa_______',
      // //     },
      // //     {
      // //       seat_label: 'I',
      // //       layout: 'aaaaaaaaaa_aaaaaaaaaaaa_aaaaaaaaaaaa___aaaaaaaaaa______',
      // //     },
      // //     {
      // //       seat_label: 'H',
      // //       layout: '_eeeeeeeeeee_eeeeeeeeee_eeeeeeeeeeeeee_____eeeeeeeeeee_',
      // //     },
      // //     {
      // //       seat_label: ' ',
      // //       layout: '__________________________',
      // //     },
      // //   ],
      // // },
      {
        seat_price: 500,
        seat_map: [
          {
            seat_label: 'G',
            layout: 'ccccccc',
          },
          {
            seat_label: 'F',
            layout: 'ccccccc',
          },
          {
            seat_label: 'E',
            layout: 'ccccccc',
          },
          {
            seat_label: 'D',
            layout: 'ccccccc',
          },
          {
            seat_label: 'C',
            layout: 'ccccccc',
          },
          {
            seat_label: 'B',
            layout: 'ccccccc',
          },
          {
            seat_label: 'A',
            layout: 'ccccccc',
          },
          {
            seat_label: ' ',
            layout: '',
          },
        ],
      },
    ];
    this.processSeatChart(this.seatConfig);
  }

  public processSeatChart(map_data: any[]) {
    if (map_data.length > 0) {
      var seatNoCounter = 1;
      for (let __counter = 0; __counter < map_data.length; __counter++) {
        var row_label = '';
        var item_map = map_data[__counter].seat_map;

        //Get the label name and price
        row_label = 'Row ' + item_map[0].seat_label + ' - ';
        if (item_map[item_map.length - 1].seat_label != ' ') {
          row_label += item_map[item_map.length - 1].seat_label;
        } else {
          row_label += item_map[item_map.length - 2].seat_label;
        }
        row_label += ' : Rs. ' + map_data[__counter].seat_price;

        item_map.forEach(
          (map_element: { seat_label: string; layout: string }) => {
            this.mapObj = {
              seatRowLabel: map_element.seat_label,
              seats: [],
              seatPricingInformation: row_label,
            };
            row_label = '';
            var seatValArr = map_element.layout.split('');
            if (this.seatChartConfig.newSeatNoForRow) {
              seatNoCounter = 1; //Reset the seat label counter for new row
            }
            var totalItemCounter = 1;
            seatValArr.forEach((item: string) => {
              this.seatObj = {
                key: map_element.seat_label + '_' + totalItemCounter,
                price: map_data[__counter]['seat_price'],
                status: 'available',
              };

              if (item != '_') {
                this.seatObj['seatLabel'] =
                  map_element.seat_label + ' ' + seatNoCounter;
                if (seatNoCounter < 10) {
                  this.seatObj['seatNo'] =
                    map_element.seat_label + seatNoCounter;
                } else {
                  this.seatObj['seatNo'] =
                    map_element.seat_label + seatNoCounter;
                }

                seatNoCounter++;
              } else {
                this.seatObj['seatLabel'] = '';
              }
              totalItemCounter++;
              this.mapObj['seats'].push(this.seatObj);
            });
            console.log(' \n\n\n Seat Objects ', this.mapObj);
            this.seatmap.push(this.mapObj);
          }
        );
      }

      // for (let __counter = 0; __counter < map_data.length; __counter++) {
      //   var row_label = "";
      //   var rowLblArr = map_data[__counter]["seat_labels"];
      //   var seatMapArr = map_data[__counter]["seat_map"];
      //   for (let rowIndex = 0; rowIndex < rowLblArr.length; rowIndex++) {
      //     var rowItem = rowLblArr[rowIndex];
      //     var mapObj = {
      //       "seatRowLabel" : rowItem,
      //       "seats" : []
      //     };
      //     var seatValArr = seatMapArr[rowIndex].split('');
      //     var seatNoCounter = 1;
      //     var totalItemCounter = 1;
      //     seatValArr.forEach(item => {
      //       var seatObj = {
      //         "key" : rowItem+"_"+totalItemCounter,
      //         "price" : map_data[__counter]["seat_price"],
      //         "status" : "available"
      //       };

      //       if( item != '_')
      //       {
      //         seatObj["seatLabel"] = rowItem+" "+seatNoCounter;
      //         if(seatNoCounter < 10)
      //         { seatObj["seatNo"] = "0"+seatNoCounter; }
      //         else { seatObj["seatNo"] = ""+seatNoCounter; }

      //         seatNoCounter++;
      //       }
      //       else
      //       {
      //         seatObj["seatLabel"] = "";
      //       }
      //       totalItemCounter++;
      //       mapObj["seats"].push(seatObj);
      //     });
      //     console.log(" \n\n\n Seat Objects " , mapObj);
      //     this.seatmap.push( mapObj );
      //     console.log(" \n\n\n Seat Map " , this.seatmap);

      //   }

      // }
    }
  }

  onSelectingPlace(event: any) {
    this.placeSelected = event.target.innerText;
    console.log('this.placeSelected: ', this.placeSelected);
    console.log('event.target.value1111111111111111111: ', event.target.value);
    console.log('event.target.value: ', event.target.innerText);
  }

  getSeatNo(event: any) {
    // console.log('this.desk:::', this.desk);
    console.log('this.seatingPlace', this.seatingPlace.response.building);
    console.log('this.selectedBuilding', this.selectedBuilding);
    console.log(event.target.innerHTML);
    if (this.placeSelected !== undefined) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = '45%';
      dialogConfig.data = {
        seatNo: event.target.innerHTML,
        place: this.placeSelected,
        building: this.selectedBuilding,
      };
      const myTempDialog = this.dialog.open(AddRequestComponent, dialogConfig);
      myTempDialog.afterClosed().subscribe((res: any) => {});
    } else {
      alert('Please enter building and place');
    }

    // this.router.navigate(['/addRequest']).then(()=>{

    // })
  }
  placeChosen: any;

  onSelectBuilding(event: any) {
    console.log('event::::', event);
    // let changeOthers = true
    // if (this.selectedBuilding == event) {
    //   changeOthers = false
    // }
    this.selectedBuilding = event;
    console.log('this.selectedBuilding: ', this.selectedBuilding);

    const selectedBul = this.building.filter((item: any) => item.name == event);

    console.log({ selectedBul });
    this.placeChosen = selectedBul[0].place;
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
  public selectSeat(seatObject: any) {
    console.log('Seat to block: ', seatObject);
    if (seatObject.status == 'available') {
      seatObject.status = 'booked';
      this.cart.selectedSeats.push(seatObject.seatLabel);
      this.cart.seatstoStore.push(seatObject.key);
      this.cart.totalamount += seatObject.price;
    } else if ((seatObject.status = 'booked')) {
      seatObject.status = 'available';
      var seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
      if (seatIndex > -1) {
        this.cart.selectedSeats.splice(seatIndex, 1);
        this.cart.seatstoStore.splice(seatIndex, 1);
        this.cart.totalamount -= seatObject.price;
      }
    }
  }

  public blockSeats(seatsToBlock: string) {
    if (seatsToBlock != '') {
      var seatsToBlockArr = seatsToBlock.split(',');
      for (let index = 0; index < seatsToBlockArr.length; index++) {
        var seat = seatsToBlockArr[index] + '';
        var seatSplitArr = seat.split('_');
        console.log('Split seat: ', seatSplitArr);
        for (let index2 = 0; index2 < this.seatmap.length; index2++) {
          const element = this.seatmap[index2];
          if (element.seatRowLabel == seatSplitArr[0]) {
            var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
            if (seatObj) {
              console.log('\n\n\nFount Seat to block: ', seatObj);
              seatObj['status'] = 'unavailable';
              this.seatmap[index2]['seats'][parseInt(seatSplitArr[1]) - 1] =
                seatObj;
              console.log('\n\n\nSeat Obj', seatObj);
              console.log(
                this.seatmap[index2]['seats'][parseInt(seatSplitArr[1]) - 1]
              );
              break;
            }
          }
        }
      }
    }
  }
}
// seatingPlace: any = {
//   response: {
//     building: [
//       {
//         name: 'Safal',
//         place: [
//           '1st Floor- Old office',
//           '1st Floor- New office',
//           '4th Floor',
//           '7th Floor-Wing 1',
//           '7th Floor-Wing 2',
//           '7th Floor-Wing 3',
//           '7th Floor-Wing 4',
//           '7th Floor-Wing 5',
//           '7th Floor-Wing 6'
//         ]
//       },
//       {
//         name: 'Scarlet',
//         place: ['5th Floor', '6th Floor']
// //       }
// //     ]
// //   }
// // }

// building: any = this.seatingPlace.response.building
// selectedBuilding: any = ''
// selectedPlace: any = ''
// placeSelected: any

// // desk:any = this.seatingPlace.seating.building

// places: any = [
//   '1st Floor- Old office',
//   '1st Floor- New office',
//   '4th Floor',
//   '7th Floor-Wing 1',
//   '7th Floor-Wing 2',
//   '7th Floor-Wing 3',
//   '7th Floor-Wing 4',
//   '7th Floor-Wing 5',
//   '7th Floor-Wing 6'
// ]
// seatConfig: any = null
// seatmap: any = []
// seatChartConfig = {
//   showRowsLabel: true,
//   showRowWisePricing: true,
//   newSeatNoForRow: true
// }
// cart = {
//   selectedSeats: [],
//   seatstoStore: [],
//   totalamount: 0,
//   cartId: '',
//   eventId: 0
// }
// seatObj: any
// mapObj: any

// constructor (public dialog: MatDialog, public router: Router) {}

// title = 'seat-chart-generator'

// ngOnInit (): void {
//   //Process a simple bus layout
//   this.seatConfig = [
//     {
//       seat_map: [
//         {
//           seat_label: 'J',
//           layout: 'ccccccc'
//         },
//         {
//           seat_label: 'I',
//           layout: 'ccccccc'
//         },
//         {
//           seat_label: 'H',
//           layout: 'ccccccc'
//         },
//         {
//           seat_label: 'G',
//           layout: 'ccccccc'
//         },
//         {
//           seat_label: 'F',
//           layout: 'ccccccc'
//         },
//         {
//           seat_label: 'E',
//           layout: 'ccccccc'
//         },
//         {
//           seat_label: 'D',
//           layout: 'ccccccc'
//         },
//         {
//           seat_label: 'C',
//           layout: 'ccccccc'
//         },
//         {
//           seat_label: 'B',
//           layout: 'ccccccc'
//         },
//         {
//           seat_label: 'A',
//           layout: 'ccccccc'
//         },
//         {
//           seat_label: ' ',
//           layout: '_______________'
//         }
//       ]
//     }
//   ]
//   this.processSeatChart(this.seatConfig)
//   // this.selectedBuilding = this.seatingPlace.response.building[0].name
//   // this.placeChosen = this.seatingPlace.response.building[0].place
//   // this.selectedPlace = this.seatingPlace.response.building[0].place[0]
// }

// public processSeatChart (map_data: any[]) {
//   if (map_data.length > 0) {
//     var seatNoCounter = 1
//     for (let __counter = 0; __counter < map_data.length; __counter++) {
//       var row_label = ''
//       var item_map = map_data[__counter].seat_map

//       //Get the label name and price
//       row_label = 'Row ' + item_map[0].seat_label + ' - '
//       if (item_map[item_map.length - 1].seat_label != ' ') {
//         row_label += item_map[item_map.length - 1].seat_label
//       } else {
//         row_label += item_map[item_map.length - 2].seat_label
//       }
//       row_label += ' : Rs. ' + map_data[__counter].seat_price

//       item_map.forEach(
//         (map_element: { seat_label: string; layout: string }) => {
//           this.mapObj = {
//             seatRowLabel: map_element.seat_label,
//             seats: [],
//             seatPricingInformation: row_label
//           }
//           row_label = ''
//           var seatValArr = map_element.layout.split('')
//           if (this.seatChartConfig.newSeatNoForRow) {
//             seatNoCounter = 1 //Reset the seat label counter for new row
//           }
//           var totalItemCounter = 1

//           seatValArr.forEach((item: string) => {
//             this.seatObj = {
//               key: map_element.seat_label + '_' + totalItemCounter,
//               price: map_data[__counter]['seat_price'],
//               status: 'available'
//             }

//             if (item != '_') {
//               this.seatObj['seatLabel'] =
//                 map_element.seat_label + ' ' + seatNoCounter
//               if (seatNoCounter < 10) {
//                 this.seatObj['seatNo'] =
//                   map_element.seat_label + '-' + seatNoCounter
//               } else {
//                 this.seatObj['seatNo'] =
//                   map_element.seat_label + '-' + seatNoCounter
//               }

//               seatNoCounter++
//             } else {
//               this.seatObj['seatLabel'] = ''
//             }
//             totalItemCounter++
//             this.mapObj['seats'].push(this.seatObj)
//           })
//           // console.log(' \n Seat Objects ', this.mapObj);
//           // console.log('this.mapObj.seatRowLabel',this.mapObj.seatRowLabel);
//           // console.log('no of seats',this.mapObj.seats);
//           this.seatmap.push(this.mapObj)
//         }
//       )
//     }
//   }
// }
// j: any
// onSelectingPlace (event: any) {
//   this.placeSelected = event.target.innerText
//   console.log('this.placeSelected: ', this.placeSelected)
//   console.log('event.target.value1111111111111111111: ', event.target.value)
//   console.log('event.target.value: ', event.target.innerText)
// }

// getSeatNo (event: any) {
//   // console.log('this.desk:::', this.desk);
//   console.log('this.seatingPlace', this.seatingPlace.response.building)
//   console.log('this.selectedBuilding', this.selectedBuilding)
//   console.log(event.target.innerHTML)
//   if (this.placeSelected !== undefined) {
//     const dialogConfig = new MatDialogConfig()
//     dialogConfig.autoFocus = true
//     dialogConfig.disableClose = true
//     dialogConfig.width = '45%'
//     dialogConfig.data = {
//       seatNo: event.target.innerHTML,
//       place: this.placeSelected,
//       building: this.selectedBuilding
//     }
//     const myTempDialog = this.dialog.open(AddRequestComponent, dialogConfig)
//     myTempDialog.afterClosed().subscribe((res: any) => {})
//   } else {
//     alert('Please enter building and place')
//   }

//   // this.router.navigate(['/addRequest']).then(()=>{

//   // })
// }
// placeChosen: any

// onSelectBuilding (event: any) {
//   console.log('event::::', event)
//   // let changeOthers = true
//   // if (this.selectedBuilding == event) {
//   //   changeOthers = false
//   // }
//   this.selectedBuilding = event
//   console.log('this.selectedBuilding: ', this.selectedBuilding)

//   const selectedBul = this.building.filter((item: any) => item.name == event)

//   console.log({ selectedBul })
//   this.placeChosen = selectedBul[0].place
//   // for (let place of this.building) {
//   //   console.log("sdfdsfsdfsdfs",this.selectedBuilding)
//   //   if (place.name == this.selectedBuilding) {
//   //     console.log('place.name: ', place.name);
//   //     this.placeChosen = place.place
//   //     console.log("place::::::;", place.place);
//   //     // if (changeOthers) {
//   //       // this.placeSelected
//   //     // }
//   //   }

//   //   break
//   // }
//   // console.log('event::::::', event)
//   // // console.log(
//   // //   'this.seatingPlace::',
//   // //   this.seatingPlace.response.building[0].place
//   // // )
//   // console.log('this.seatingPlace.response.place', this.seatingPlace.response)
//   // let changeOthers = true
//   // if (this.selectedBuilding == event) {
//   //   changeOthers = false
//   // }
//   // this.selectedBuilding = event
//   // console.log('this.selectedBuilding: ', this.selectedBuilding)
//   // for (let seat of this.seatingPlace.response.building) {
//   //   if (seat.name == this.selectedBuilding) {
//   //     this.place = this.seatingPlace.response
//   //     console.log('this.place1111:::--->', this.place)
//   //   }
//   //   if (changeOthers) {
//   //     // this.place = this.seatingPlace.response.place[0]
//   //     this.place = this.seatingPlace.response.building
//   //     console.log('this.place2222222:::--->', this.place)
//   //   }
//   //   break
//   // }
// }

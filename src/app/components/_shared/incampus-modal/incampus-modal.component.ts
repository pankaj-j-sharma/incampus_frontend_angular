import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-incampus-modal',
  templateUrl: './incampus-modal.component.html',
  styleUrls: ['./incampus-modal.component.css']
})
export class IncampusModalComponent implements OnInit {

	closeResult: string;
  display = "none";

  @Input() modalId :string=""; 
  arrOfRows:number[]=[];
  numberOfCols:number=9;

  @ViewChild('longContent', { read: TemplateRef ,static: false}) private longContent:TemplateRef<any>;


	constructor(private modalService: NgbModal) {}

  launchModal(){
    this.openScrollableContent(this.longContent);
    console.log("modalId passed",this.modalId);
  }

	openScrollableContent(longContent) {
		this.modalService.open(longContent, { scrollable: true} ).result.then((result)=> {
      this.closeResult = `Closed with ${result}`;
    },(reason)=> {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
	}

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  // openModal() {
  //   this.display = "block";
  // }
  // onCloseHandled() {
  //   this.display = "none";
  // }  

  ngOnInit(): void {
    // this.openScrollableContent(this.longContent);

  }


}

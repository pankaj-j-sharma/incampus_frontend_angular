import { Component, Input,Output, OnInit, SimpleChanges, TemplateRef, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  @Input('formGroup') modalForm :any; 
  @Output() onFormSubmit = new EventEmitter<any>();
  arrOfRows:number[]=[];
  numberOfCols:number=9;

  @ViewChild('longContent', { read: TemplateRef ,static: false}) private longContent:TemplateRef<any>;


	constructor(private modalService: NgbModal) {}

  ngOnChanges(changes: SimpleChanges) {   
    for (let propName in changes) {
       // when your @Input value is changed  
       if(propName === "formGroup"){
           console.log(this.modalForm);
       }
    }
 }

 submitModalForm(){
  console.log("submitModalForm");
  this.onFormSubmit.emit(this.modalForm.value);
 }

  launchModal(){
    this.openScrollableContent(this.longContent);
    console.log("modalId passed",this.modalId,this.modalForm);
  }

	openScrollableContent(longContent) {
		this.modalService.open(longContent, { scrollable: true} ).result.then((result)=> {
      this.closeResult = `Closed with ${result}`;
    },(reason)=> {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log("this.closeResult",this.closeResult);
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
    console.log("modal id",this.modalId);
  }


}

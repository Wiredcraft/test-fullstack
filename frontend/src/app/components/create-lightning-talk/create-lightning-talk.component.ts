import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LightningTalkService } from 'src/app/services/lightning-talk.service';

@Component({
  selector: 'app-create-lightning-talk',
  templateUrl: './create-lightning-talk.component.html',
  styleUrls: ['./create-lightning-talk.component.css']
})
export class CreateLightningTalkComponent implements OnInit {
  apiResult;
  createForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private lightningTalkService: LightningTalkService) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      file: [null, Validators.required],
      fileSource: ['', Validators.required],
    });
  }

  handleFileInput(files: FileList) {
    this.createForm.patchValue({
      fileSource: files.item(0)
    });
  }

  get controls() { return this.createForm.controls; }

  submit() {
    if (!this.createForm.valid) {
      return;
    }

    this.lightningTalkService.create(this.controls.title.value, this.controls.description.value, this.controls.fileSource.value).subscribe((data: any) => {
      this.apiResult = data.error;
      if (!data.error) {
        return this.router.navigate(['lightningtalks', data.result.id]);
      }
    }, (error) => {
      this.apiResult = error;
    });
  }
}

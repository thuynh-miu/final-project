import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ContentChange, QuillConfigModule, QuillModule } from 'ngx-quill';
import Quill from 'quill';
import { MatMenuModule } from '@angular/material/menu';
import { Dialogue } from '../interfaces/dialogue';

@Component({
  selector: 'app-write',
  imports: [
    QuillModule,
    ReactiveFormsModule,
    CommonModule,
    MatDivider,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './write.component.html',
  styleUrl: './write.component.css',
})
export class WriteComponent {
  editor: Quill | null = null;

  dialogues: Dialogue[] = [];

  constructor() {
    this.dialogues.push({
      html: '<div>What is in your mind?</div>',
      role: 'assistant',
    });
  }

  form = inject(FormBuilder).nonNullable.group({
    jsonContent: '',
  });

  editorStyles = {
    fontSize: '24px', // Default text size
  };
  quillConfig: QuillModule = {
    toolbar: false,
  };

  onContentChanged(event: ContentChange) {
    // console.log(event.html);
  }

  onEditorCreated(editor: Quill) {
    this.editor = editor;
  }

  handleDeepDiveClick() {
    this.dialogues.push({
      html: this.editor?.getSemanticHTML() || '',
      role: 'user',
    });
    this.dialogues.push({
      html: '<div>How was it?</div>',
      role: 'assistant',
    });
    this.editor?.setContents([]);
  }
}

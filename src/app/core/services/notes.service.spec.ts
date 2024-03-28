import { TestBed } from '@angular/core/testing';

import { notesService } from './notes.service';

describe('notesService', () => {
  let service: notesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(notesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

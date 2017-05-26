import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, DataUtils } from 'ng-jhipster';

import { Article } from './article.model';
import { ArticlePopupService } from './article-popup.service';
import { ArticleService } from './article.service';
import { Blog, BlogService } from '../blog';
import { Tag, TagService } from '../tag';

@Component({
  selector: 'jhi-article-dialog',
  templateUrl: './article-dialog.component.html'
})
export class ArticleDialogComponent implements OnInit {

  article: Article;
  authorities: any[];
  isSaving: boolean;

  blogs: Blog[];

  tags: Tag[];

  constructor(
    public activeModal: NgbActiveModal,
    private dataUtils: DataUtils,
    private alertService: AlertService,
    private articleService: ArticleService,
    private blogService: BlogService,
    private tagService: TagService,
    private eventManager: EventManager
  ) {
  }

  ngOnInit() {
    this.isSaving = false;
    this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    this.blogService.query().subscribe(
      (res: Response) => { this.blogs = res.json(); }, (res: Response) => this.onError(res.json()));
    this.tagService.query().subscribe(
      (res: Response) => { this.tags = res.json(); }, (res: Response) => this.onError(res.json()));
  }
  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, article, field, isImage) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (isImage && !/^image\//.test(file.type)) {
        return;
      }
      this.dataUtils.toBase64(file, (base64Data) => {
        article[field] = base64Data;
        article[`${field}ContentType`] = file.type;
      });
    }
  }
  clear() {
    this.activeModal.dismiss('cancel');
  }

  save() {
    this.isSaving = true;
    if (this.article.id !== undefined) {
      this.subscribeToSaveResponse(
        this.articleService.update(this.article));
    } else {
      this.subscribeToSaveResponse(
        this.articleService.create(this.article));
    }
  }

  private subscribeToSaveResponse(result: Observable<Article>) {
    result.subscribe((res: Article) =>
      this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
  }

  private onSaveSuccess(result: Article) {
    this.eventManager.broadcast({ name: 'articleListModification', content: 'OK' });
    this.isSaving = false;
    this.activeModal.dismiss(result);
  }

  private onSaveError(error) {
    try {
      error.json();
    } catch (exception) {
      error.message = error.text();
    }
    this.isSaving = false;
    this.onError(error);
  }

  private onError(error) {
    this.alertService.error(error.message, null, null);
  }

  trackBlogById(index: number, item: Blog) {
    return item.id;
  }

  trackTagById(index: number, item: Tag) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}

@Component({
  selector: 'jhi-article-popup',
  template: ''
})
export class ArticlePopupComponent implements OnInit, OnDestroy {

  modalRef: NgbModalRef;
  routeSub: any;

  constructor(
    private route: ActivatedRoute,
    private articlePopupService: ArticlePopupService
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      if (params['id']) {
        this.modalRef = this.articlePopupService
          .open(ArticleDialogComponent, params['id']);
      } else {
        this.modalRef = this.articlePopupService
          .open(ArticleDialogComponent);
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}

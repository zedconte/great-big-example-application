import { Component, OnInit, OnDestroy } from '@angular/core'
import { MessageService } from './message.service'

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { GridOptions } from 'ag-grid/main'

import { FeathersService } from '../../core/services/feathers.service';
import * as fromRoot from '../../core/store';

@Component({
  selector: 'message',
  templateUrl: 'message.page.html',
  providers: [MessageService]
})

export class MessagePage implements OnInit, OnDestroy {
  private messages$: Observable<any>
  private messagesSubscription: any
  public gridOptions: GridOptions
  public columnDefs: any[]
  public messages = []
  public email: string
  public message: string

  constructor(private store: Store<fromRoot.RootState>,
    private feathersService: FeathersService) { }

  ngOnInit() {
    this.messages$ = this.store.select('message')

    // Listen for changes to the store and update the ag-grid table accordingly
    this.messagesSubscription = this.messages$.subscribe((messages: any[]) => {
      this.messages = messages
      this.createDataSource()
    })

    // Listen for new messages from the socket service and update the store accordingly
    // this.feathersService.services.message.resource$.subscribe(res => {
    //   switch (res.type) {
    //     case 'find':
    //       this.store.dispatch({
    //         type: 'MESSAGE_INIT',
    //         payload: res.messages
    //       })
    //       break
    //     case 'created':
    //       // this.store.dispatch({
    //       //   type: 'MESSAGE_UPDATE',
    //       //   payload: res.messages
    //       // })
    //       this.feathersService.services.message.findMessages()
    //       break
    //     default:
    //       break
    //   }
    // })

    // ag-grid initialization
    this.gridOptions = <GridOptions>{}
    this.columnDefs = this.createColumnDefs()
    this.email = 'anonymous'
    this.message = ''
  }

  ngOnDestroy() {
    this.messagesSubscription.unsubscribe()
    // this.messageService.off()
  }

  onGridReady() {
    this.gridOptions.api.sizeColumnsToFit()
    this.store.dispatch(this.feathersService.services.message.find({
      query: {
        $sort: { createdAt: -1 }
      }
    }));
    // this.messageService.findMessages()
  }

  createColumnDefs() {
    return [
      {
        headerName: 'Email',
        field: 'email'
      },
      {
        headerName: 'Message',
        field: 'message'
      },
      {
        headerName: 'Created Time',
        field: 'createdAt'
      },
      {
        headerName: 'Updated Time',
        field: 'updatedAt'
      }
    ]
  }


  createDataSource() {
    if (!this.gridOptions) return
    let dataSource = {
      rowCount: -1,
      getRows: params => {
        let rowsThisPage = this.messages.slice(params.startRow, params.endRow)
        let lastRow = -1
        if (this.messages.length <= params.endRow) {
          lastRow = this.messages.length
        }
        params.successCallback(rowsThisPage, this.messages.length)
      }
    }

    this.gridOptions.api.setDatasource(dataSource)
  }

  createMessage() {
    // Create a new message on the server and then dispatch an action to
    // put it in the store
    this.store.dispatch(this.feathersService.services.message.create({
      email: this.email,
      message: this.message
    }));

    // this.messageService.createMessage({
    //   email: this.email,
    //   message: this.message
    // })

  }
}

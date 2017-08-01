import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { NotificationService } from '../../../core/services/notification.service';
import { UtilityService } from '../../../core/services/utility.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  public orderDetails: any[];
  public entity: any;
  public totalAmount: number;
  constructor(private _utilityService: UtilityService,
    private _dataService: DataService,
    private _activatedRoute: ActivatedRoute,
    private _notificationService: NotificationService) { }


  ngOnInit() {
    this._activatedRoute.params.subscribe((params: Params) => {
      let orderId = params['id'];
      this.loadOrder(params['id']);

      this.loadOrderDetail(params['id']);
    });

  }
  public loadOrder(id: number) {
    this._dataService.get('/api/order/detail/' + id.toString()).subscribe((response: any) => {
      this.entity = response;
    }, error => this._dataService.handleError(error));
  }

  public loadOrderDetail(id: number) {
    this._dataService.get('/api/order/getalldetails/' + id.toString()).subscribe((response: any[]) => {
      this.orderDetails = response;
      this.totalAmount = 0;
      for (var item of this.orderDetails) {
        this.totalAmount = this.totalAmount + (item.Quantity * item.Price);
      }
      console.log(this.totalAmount);
    }, error => this._dataService.handleError(error));
  }
  public goBack() {
    this._utilityService.navigate('/main/order');
  }
}
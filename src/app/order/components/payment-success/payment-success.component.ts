import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css'],
})
export class PaymentSuccessComponent implements OnInit {
  vnp_Amount: number;
  vnp_BankCode: string;
  vnp_BankTranNo: string;
  vnp_CardType: string;
  vnp_OrderInfo: string;
  vnp_PayDate: string;
  vnp_ResponseCode: string;
  vnp_TmnCode: string;
  vnp_TransactionNo: string;
  vnp_TransactionStatus: string;
  vnp_TxnRef: string;
  vnp_SecureHash: string;

  isSuccess: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {
    this.vnp_Amount = this.route.snapshot.queryParams['vnp_Amount'];
    this.vnp_BankCode = this.route.snapshot.queryParams['vnp_BankCode'];
    this.vnp_BankTranNo = this.route.snapshot.queryParams['vnp_BankTranNo'];
    this.vnp_CardType = this.route.snapshot.queryParams['vnp_CardType'];
    this.vnp_OrderInfo = this.route.snapshot.queryParams['vnp_OrderInfo'];
    this.vnp_PayDate = this.route.snapshot.queryParams['vnp_PayDate'];
    this.vnp_ResponseCode = this.route.snapshot.queryParams['vnp_ResponseCode'];
    this.vnp_TransactionNo =
      this.route.snapshot.queryParams['vnp_TransactionNo'];
    this.vnp_TransactionStatus =
      this.route.snapshot.queryParams['vnp_TransactionStatus'];
    this.vnp_TxnRef = this.route.snapshot.queryParams['vnp_TxnRef'];
    this.vnp_SecureHash = this.route.snapshot.queryParams['vnp_SecureHash'];
    this.vnp_TmnCode = this.route.snapshot.queryParams['vnp_TmnCode'];

    this.orderService
      .returnPay(
        this.vnp_Amount,
        this.vnp_BankCode,
        this.vnp_BankTranNo,
        this.vnp_CardType,
        this.vnp_OrderInfo,
        this.vnp_PayDate,
        this.vnp_ResponseCode,
        this.vnp_TmnCode,
        this.vnp_TransactionNo,
        this.vnp_TransactionStatus,
        this.vnp_TxnRef,
        this.vnp_SecureHash
      )
      .subscribe(
        (item) => {
          if (item) {
            this.isSuccess = true;
          }
        },
        (error) => {
          this.isSuccess = false;
          console.log('co loi roi kia');
        }
      );

    console.log(this.vnp_Amount);
    console.log(this.vnp_BankCode);
    console.log(this.vnp_BankTranNo);
    console.log(this.vnp_CardType);
    console.log(this.vnp_OrderInfo);
    console.log(this.vnp_PayDate);
    console.log(this.vnp_ResponseCode);
    console.log(this.vnp_TmnCode);
    console.log(this.vnp_TransactionNo);
    console.log(this.vnp_TransactionStatus);
    console.log(this.vnp_TxnRef);
    console.log(this.vnp_SecureHash);
  }

  ngOnInit(): void {}
}

//
//  TicketItemTableViewCell.h
//  BaoCai
//
//  Created by 刘国龙 on 16/7/8.
//  Copyright © 2016年 Beijing KuaiYiJianKang Management Co., Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>

#import "TicketItemModel.h"

#import "MyRequest.h"

@interface TicketItemTableViewCell : UITableViewCell

- (void)reloadData:(TicketItemModel *)model ticketListType:(TicketListType)ticketListType;

@end
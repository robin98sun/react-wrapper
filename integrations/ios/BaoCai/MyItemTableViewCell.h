//
//  MyItemTableViewCell.h
//  BaoCai
//
//  Created by 刘国龙 on 16/7/5.
//  Copyright © 2016年 Beijing KuaiYiJianKang Management Co., Ltd. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MyItemModel.h"

@interface MyItemTableViewCell : UITableViewCell

- (void)reloadData:(MyItemModel *)model;

@end
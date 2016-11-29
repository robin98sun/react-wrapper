//
//  UIDiscoverViewController.m
//  BaoCai
//
//  Created by 刘国龙 on 16/7/24.
//  Copyright © 2016年 Beijing KuaiYiJianKang Management Co., Ltd. All rights reserved.
//

#import "UIDiscoverViewController.h"

#import "UIViewController+WebView.h"

@interface UIDiscoverViewController () <UIWebViewDelegate>

@end

@implementation UIDiscoverViewController

- (void)viewDidLoad {
    self.canScroll = YES;
    self.showLoading = YES;
    self.staticTitle = YES;
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    if ([self.navigationController respondsToSelector:@selector(interactivePopGestureRecognizer)])
        self.navigationController.interactivePopGestureRecognizer.delegate = nil;
    
    self.openInNewWindow = YES;
    [self loadRequest];
    [self.leftBt setHidden:YES];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    
}

#pragma mark - Custom method

- (void)loadRequest {
    [self.webView loadRequest:[self getWebBrowserRequestWithUrl:[NSString stringWithFormat:@"%@views/discover/index", kServerAddress]]];
}

@end

//
//  ConfigGlobe.h
//  KuaiYi_Doctor
//
//  Created by 刘国龙 on 16/3/9.
//  Copyright © 2016年 Beijing Baocai Information Service Co.,Ltd. All rights reserved.
//

#ifndef ConfigGlobe_h
#define ConfigGlobe_h

#import "AppMacro.h"
#import "NotificationMacro.h"
#import "VendorMacro.h"
#import "UtilsMacro.h"

#define WS(weakSelf)  __weak __typeof(&*self)weakSelf = self;

/** DEBUG LOG **/
#ifdef DEBUG

#define DLog( s, ... ) printf("[%s] %s [第%d行] %s\n", __TIME__, __FUNCTION__, __LINE__, [[NSString stringWithFormat:s, ## __VA_ARGS__] UTF8String])

#else

#define DLog( s, ... )

#endif

#define BOLDSYSTEMFONT(FONTSIZE)[UIFont boldSystemFontOfSize:FONTSIZE]
#define SYSTEMFONT(FONTSIZE)    [UIFont systemFontOfSize:FONTSIZE]

#define SHOWTOAST(MESSAGE) [[[[UIApplication sharedApplication] delegate] window] makeToast:MESSAGE duration:2.0 position:CSToastPositionCenter]

#define SHOWPROGRESSHUD [MBProgressHUD showHUDAddedTo:[[[UIApplication sharedApplication] delegate] window] animated:YES]

#define HIDDENPROGRESSHUD [MBProgressHUD hideAllHUDsForView:[[[UIApplication sharedApplication] delegate] window] animated:YES]

#endif /* ConfigGlobe_h */
//
//  testWCM.m
//  testWCM
//
//  Copyright (c) 2012-2014 Apple Inc.
//  All rights reserved.
//
//  Description:
//

#include <pthread.h>
#include <readline/readline.h>

#import <Foundation/Foundation.h>
#import "WRM_iRATInterfaceCommonDefs.h"
#import "WCMInterface.h"
#import <xpc/private.h>
#import <xpc/base.h> 

typedef enum {
    WRM_PROXIMITY_RECOMMENDATION, 
    WRM_EXIT_MENU
}WRM_TestCommand; 

static xpc_object_t        wcmConnection;
static dispatch_queue_t    queue;
static dispatch_group_t    group;

int sendTerminiousRecommendation(int btGood, int wifiGood, int directWifiGood) 
{
    const char*         arg_keys[3] = {kBTRecommendationEnabled, kWIFIRecommendationEnabled,kdirectWIFIRecommendationEnabled};
    xpc_object_t        arg_values[3] = { xpc_uint64_create(btGood), xpc_uint64_create(wifiGood),xpc_uint64_create(directWifiGood)};
    xpc_object_t        arg = xpc_dictionary_create(arg_keys, arg_values, 3);

    printf("BT Good: %d, WiFi Good: %d \n", btGood, wifiGood);

    const char*         keys[2] = { "kMessageId", "kMessageArgs" };
    xpc_object_t        values[2] = { xpc_uint64_create(WCMTestTerminiousRecommendation), arg };
    xpc_object_t        msg = xpc_dictionary_create(keys, values, 2);
  
    xpc_connection_send_message(wcmConnection, msg);
  
    xpc_release(msg);
    return 0;
}

void drawMenu()
{
    printf(" <<< testiRAT command >>> \n");
    printf("%d> Trigger terminious proximity recommendation \n", WRM_PROXIMITY_RECOMMENDATION);
    printf("%d> Exit \n", WRM_EXIT_MENU);
    printf("Option ? : ");
}

/****************************************************************************/
/*	Command Parsing	 														*/
/****************************************************************************/
void *parseArgs(char *line)
{
    WRM_TestCommand  menuOption; 
    int btGood = 0; 
    int wifiGood = 0; 
    int directWifiGood = 0;  

    while (1)  {   
     drawMenu(); 
     scanf("%d", &menuOption);

     switch (menuOption) {

     case WRM_PROXIMITY_RECOMMENDATION:  
        printf("Enter BT recommendation: Good(1) OR BAD(0):");
        scanf("%d", &btGood);
        printf("Enter WIFI recommendation: Good(1) OR BAD(0):"); 
        scanf("%d", &wifiGood); 
        printf("Enter direct WIFI recommendation: Good(1) OR BAD(0):"); 
        scanf("%d", &directWifiGood); 

	sendTerminiousRecommendation (btGood, wifiGood, directWifiGood); 
        break; 

     case WRM_EXIT_MENU:  
   	   exit (0);
	   return NULL; 

      default: 
         printf("Error: command not supported \n");
	 break;
     }
    } 
 
   exit(0);
    return NULL;
}

static void startCommandInterface()
{
    pthread_t thread1;
    pthread_attr_t attr;
    void *status;
    
    pthread_attr_init(&attr);
    pthread_attr_setdetachstate(&attr, PTHREAD_CREATE_JOINABLE);
    
    int	res	= pthread_create(&thread1, &attr, parseArgs, NULL);
	if (res) {
			NSLog(@"Could not create a thread\n");
			exit(1);
	}
    
    pthread_join(thread1, &status);
	
}

/****************************************************************************/
/*								XPC messages								*/
/****************************************************************************/
static void setCommandLineInterface()
{
    
    const char* 	arg_keys[1] = { "kWCMRegisterProcess_ProcessId"};
    xpc_object_t	arg_values[1] = { xpc_int64_create(WRMTest)};
    xpc_object_t	args = xpc_dictionary_create(arg_keys, arg_values, 1);
    
    const char* 	keys[2] = { "kMessageId", "kMessageArgs" };
    xpc_object_t	values[2] = { xpc_int64_create(1), args };
    xpc_object_t	msg = xpc_dictionary_create(keys, values, 2);

    xpc_connection_send_message(wcmConnection, msg);
    NSLog(@"Sent message");
    
    xpc_release(args);
    
    startCommandInterface();
	
}

static void handleEvent(xpc_object_t event)
{
    NSLog(@"testiRAT XPC Handler : Received event %@", event);
    if (xpc_get_type(event) == XPC_TYPE_ERROR) {
        if (XPC_ERROR_CONNECTION_INTERRUPTED == event) {
            const char* 	arg_keys[1] = { "kWCMRegisterProcess_ProcessId"};
            xpc_object_t	arg_values[1] = { xpc_int64_create(WRMTest)};
            xpc_object_t	args = xpc_dictionary_create(arg_keys, arg_values, 1);
            
            const char* 	keys[2] = { "kMessageId", "kMessageArgs" };
            xpc_object_t	values[2] = { xpc_int64_create(1), args };
            xpc_object_t	msg = xpc_dictionary_create(keys, values, 2);
            
            xpc_connection_send_message(wcmConnection, msg);
            NSLog(@"Sent Re-Register Message");
            xpc_release(args);
        } else if (XPC_ERROR_TERMINATION_IMMINENT) {
            NSLog(@"WCM about to Die");
        } else if (XPC_ERROR_CONNECTION_INVALID) {
            NSLog(@"Invalid XPC Connection");
        }
    }
}

/****************************************************************************/
/*								Main         								*/
/****************************************************************************/
int main (int argc, const char * argv[])
{

      @autoreleasepool {
        // insert code here...
        NSLog(@"testIRAT");
        
        wcmConnection = xpc_connection_create_mach_service(PURPLE_WIRELESSCOEXMANAGER_SERVICE, dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), 0);

        if (wcmConnection) {
            xpc_connection_set_event_handler(wcmConnection, ^(xpc_object_t event) { handleEvent(event); });
            xpc_connection_resume(wcmConnection);
        } else {
            NSLog(@"Failed to create XPC server. Exiting.");
            exit(0);
        }
        
        //create command prompt to send messages to WCM
        queue = dispatch_queue_create("com.example.MyQueue", NULL);
        group = dispatch_group_create();
          
  
        dispatch_group_async(group, queue, ^{
            setCommandLineInterface();
        });
        
        
        dispatch_group_wait(group, DISPATCH_TIME_FOREVER);
        dispatch_release(group);
        
        return 0;
    }
}



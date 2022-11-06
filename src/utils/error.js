[
    // EMAIL ERROR
    {
        "data": {
            "data": {
                "customerCreate": {
                    "customer": null,
                    "customerUserErrors": [
                        {
                            "field": [
                                "input",
                                "email"
                            ],
                            "message": "Email has already been taken",
                            "code": "TAKEN"
                        }
                    ]
                }
            }
        }
    },
    //LIMIT EXCEED
    {
        "data": {
            "data": {
                "customerCreate": null
            },
            "errors": [
                {
                    "message": "Creating Customer Limit exceeded. Please try again later.",
                    "locations": [
                        {
                            "line": 3,
                            "column": 3
                        }
                    ],
                    "path": [
                        "customerCreate"
                    ]
                }
            ]
        }
    },
    {
        "data": {
            "data": {
                "customerCreate": {
                    "customer": null,
                    "customerUserErrors": [
                        {
                            "field": [
                                "input",
                                "email"
                            ],
                            "message": "Email has already been taken",
                            "code": "TAKEN"
                        }
                    ]
                }
            }
        }
    },
    //Success log
    {
        "data": {
            "data": {
                "customerCreate": {
                    "customer": {
                        "id": "gid://shopify/Customer/6144260702360",
                        "firstName": "Vishesh",
                        "lastName": null,
                        "email": "sabgrowth@gmail.com",
                        "acceptsMarketing": true
                    },
                    "customerUserErrors": []
                }
            }
        }
    },
    //ERROR WHILE CREATING CUSTOMER

],
{
    "_handleNewStatus": [Function anonymous], "_nativeOnError": [Function anonymous], "_nativeOnFullscreenUpdate": [Function anonymous],
    "_nativeOnLoad": [Function anonymous], "_nativeOnLoadStart": [Function anonymous], "_nativeOnPlaybackStatusUpdate": [Function anonymous], "_nativeOnReadyForDisplay": [Function anonymous], "_nativeRef": { "current": { "_children": [Array], "_internalFiberInstanceHandleDEV": [FiberNode], "_nativeTag": 867, "viewConfig": [Object] } }, "_onPlaybackStatusUpdate": null, "_performOperationAndHandleStatusAsync": [Function anonymous], "_reactInternalInstance": {}, "_reactInternals": {
        "_debugHookTypes": null, "_debugNeedsRemount": false, "_debugOwner": { "_debugHookTypes": [Array], "_debugNeedsRemount": false, "_debugOwner": [FiberNode], "_debugSource": undefined, "actualDuration": 8, "actualStartTime": 1667651204401, "alternate": [FiberNode], "child": [FiberNode], "childLanes": 0, "deletions": null, "dependencies": null, "elementType": [Function VideoPlayer], "flags": 8388609, "index": 0, "key": null, "lanes": 0, "memoizedProps": [Object], "memoizedState": [Object], "mode": 2, "pendingProps": [Object], "ref": null, "return": [FiberNode], "selfBaseDuration": 1, "sibling": null, "stateNode": null, "subtreeFlags": 8389125, "tag": 0, "treeBaseDuration": 8, "type": [Function VideoPlayer], "updateQueue": [Object] }, "_debugSource": undefined, "actualDuration": 0, "actualStartTime": 1667651204402, "alternate": { "_debugHookTypes": null, "_debugNeedsRemount": false, "_debugOwner": [FiberNode], "_debugSource": undefined, "actualDuration": 1, "actualStartTime": 1667651204371, "alternate": [Circular], "child": [FiberNode], "childLanes": 0, "deletions": null, "dependencies": null, "elementType": [Function Video], "flags": 513, "index": 0, "key": null, "lanes": 0, "memoizedProps": [Object], "memoizedState": [Object], "mode": 2, "pendingProps": [Object], "ref": [Function ref], "return": [FiberNode], "selfBaseDuration": 0, "sibling": [FiberNode], "stateNode": [Circular], "subtreeFlags": 5, "tag": 1, "treeBaseDuration": 1, "type": [Function Video], "updateQueue": [Object] }, "child": {
            "_debugHookTypes": null, "_debugNeedsRemount": false, "_debugOwner": [Circular], "_debugSource": null, "actualDuration": 0, "actualStartTime": 1667651204402, "alternate": [FiberNode], "child": [FiberNode], "childLanes": 0, "deletions": null, "dependencies": null, "elementType": [Object], "flags": 1, "index": 0, "key": null, "lanes": 0, "memoizedProps": [Object],
            "memoizedState": null, "mode": 2, "pendingProps": [Object], "ref": null, "return": [Circular], "selfBaseDuration": 0, "sibling": null, "stateNode": null, "subtreeFlags": 5, "tag": 11, "treeBaseDuration": 0, "type": [Object], "updateQueue": null
        }, "childLanes": 0, "deletions": null, "dependencies": null, "elementType": [Function Video], "flags": 513, "index": 0, "key": null, "lanes": 0, "memoizedProps": { "onPlaybackStatusUpdate": [Function updatePlaybackCallback], "resizeMode": "contain", "shouldPlay": false, "source": [Object], "style": [Object] }, "memoizedState": { "showPoster": false }, "mode": 2, "pendingProps": { "onPlaybackStatusUpdate": [Function updatePlaybackCallback], "resizeMode": "contain", "shouldPlay": false, "source": [Object], "style": [Object] }, "ref": [Function ref], "return": {
            "_debugHookTypes": null, "_debugNeedsRemount": false, "_debugOwner": [FiberNode], "_debugSource": undefined, "actualDuration": 7, "actualStartTime": 1667651204402, "alternate": [FiberNode], "child": [Circular], "childLanes": 0, "deletions": null, "dependencies": null, "elementType": "RCTView", "flags": 4, "index": 0, "key": null, "lanes": 0, "memoizedProps": [Object], "memoizedState": null, "mode": 2, "pendingProps": [Object], "ref": null, "return": [FiberNode], "selfBaseDuration": 0, "sibling": null, "stateNode":
                [ReactNativeFiberHostComponent], "subtreeFlags": 8389125, "tag": 5, "treeBaseDuration": 7, "type": "RCTView", "updateQueue": null
        }, "selfBaseDuration": 0, "sibling": {
            "_debugHookTypes": null, "_debugNeedsRemount": false, "_debugOwner": [FiberNode], "_debugSource": undefined, "actualDuration":
                2, "actualStartTime": 1667651204402, "alternate": [FiberNode], "child": [FiberNode], "childLanes": 0, "deletions": null, "dependencies": null, "elementType": [Object], "flags": 1, "index": 1, "key": null, "lanes": 0, "memoizedProps": [Object], "memoizedState": null, "mode": 2, "pendingProps":
                [Object], "ref": null, "return": [FiberNode], "selfBaseDuration": 0, "sibling": [FiberNode], "stateNode": null, "subtreeFlags": 5, "tag": 11, "treeBaseDuration": 2, "type": [Object], "updateQueue": null
        }, "stateNode": [Circular], "subtreeFlags": 5, "tag": 1, "treeBaseDuration": 0, "type": [Function Video], "updateQueue": { "baseState": [Object], "effects": null, "firstBaseUpdate": null, "lastBaseUpdate": null, "shared": [Object] }
    }, "_renderPoster": [Function anonymous], "_setFullscreen": [Function anonymous], "context": {}, "dismissFullscreenPlayer": [Function anonymous], "getStatusAsync": [Function anonymous], "loadAsync": [Function anonymous], "presentFullscreenPlayer": [Function anonymous], "props": { "onPlaybackStatusUpdate": [Function updatePlaybackCallback], "resizeMode": "contain", "shouldPlay": false, "source": { "uri": "https://trnr-app-media.s3.ap-southeast-2.amazonaws.com/test1_11a4252fc0.mp4" }, "style": { "flex": 1, "justifyContent": "center" } }, "refs": {}, "replayAsync": [Function anonymous], "setStatusAsync": [Function anonymous], "state": { "showPoster": false }, "unloadAsync": [Function anonymous], "updater": { "enqueueForceUpdate": [Function enqueueForceUpdate], "enqueueReplaceState": [Function enqueueReplaceState], "enqueueSetState": [Function enqueueSetState], "isMounted": [Function isMounted] }
}
## Kinder Kitchen - Known Bugs 
**Add/Edit/Delete Item**: 
- Deletion of the *LAST* Item in any given category, does not update front end. 

**Add/Edit Item [Warning]:** 
- Can’t perform a React state update on an unmounted component: This is a no-op, but it indicates a memory leak in the application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

**Delete Recipe:** 
- Deletion of *ANY* Recipe does not update front end. Navigating away from page and re-entry shows update.
 
**Android [Warning]**
- Timer Extended for a prolonged amount of time
- Implemented a console ignore
- Needs more Sleuthing

**Recipe Search [Warning]**
- Multi Child Key Value: causes display errors when searching and duplicate entries are being filitered 

**OTHER**
- AsynchStorage() has become obsolete.
- [UI iOS] Add Category on iOS is covered by keyboard
- [UI iOS] Achievement screen on iOS is not displayed properly

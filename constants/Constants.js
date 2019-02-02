export default {
    // Lables
    TIME_PASSED: 'TIME PASSED',
    NEW_MAIL_ITEM_DECISION_VERBAL:{
      ACCEPTED: 'ACCEPTED',
      DECLINED: 'DECLINED',
      REPEAT: 'REPEAT WAS REQUESTED'
    },
    SAVE_LBL: 'Save',
    CITY_LBL: 'City',
    ADDRESS_LBL: 'Address',
    ZIP_CODE_LBL: 'Zip Code',
    UNIQUE_IDENTIFIER_LBL: 'Unique identifier',
    UPDATE_SETTINGS_LBL: 'Update settings',
    DEFAULT_BEHAVIOR_AFTER_LBL: 'Default behavior after',
    OPEN_BY_DEFAULT_LBL: 'Open by default',
    MAILBOX_INFO_LBL: 'Mailbox info',
    ITEMS_LBL: 'Items',
    SETTINGS_LBL: 'Settings',
    MAILBOXES_LBL: 'Mailboxes',
    MAILBOX_ITEM_DETAILS: 'Mailbox item details',

    // Firebase function URLs
    FUNCTIONS_URL:{
      GET_MAILBOX_SETTINGS: 'https://us-central1-peepnee-backend.cloudfunctions.net/getMailboxSettings?mailboxId=',
      UPDATE_MAIL_ITEM_STATUS: 'https://us-central1-peepnee-backend.cloudfunctions.net/updateMailItemStatus',
      GET_MAILBOX_ITEMS: 'https://us-central1-peepnee-backend.cloudfunctions.net/getMailboxItems?mailboxId=',
      GET_MY_MAILBOXES: 'https://us-central1-peepnee-backend.cloudfunctions.net/getMyMailboxes?userId='
    }
  };
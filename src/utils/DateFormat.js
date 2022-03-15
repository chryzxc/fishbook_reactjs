import React from 'react'
import { format, formatDistance, subDays,formatDistanceStrict } from "date-fns";

export default function DateFormat({date}) {
    // return formatDistance(subDays(new Date(date), 2), new Date(), {
    //     addSuffix: true,
    //   });

    //  return formatDistance(new Date(date), new Date(), {
    //     addSuffix: true
    //   })

      return formatDistanceStrict(new Date(date), new Date(), {
      
        roundingMethod: 'ceil'
      })

}

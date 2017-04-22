/**
 * Created by Qi on 4/18/17.
 */

export default parameters = [
    {
        'name':'type',
        'text':'Scenario Type',
        'default':'simple',
        'values':['simple','rate-vs-latency','varying']
    },
    {
        'name':'time-limit',
        'text':'Time Limit (second)',
        'default':10,
        'values':[10, 30, 60, 120, 180, 240, 300]
    },
    {
        'name':'producer-count',
        'text':'Number of Producer',
        'default':1,
        'values':[1, 2, 3, 4, 5, 6, 7, 8]
    },
    {
        'name':'producer-rate-limit',
        'text':'Producer Rate Limit',
        'default':0,
        'values':[0, 5000, 10000, 20000, 30000, 40000, 50000, 100000]
    },
    {
        'name':'consumer-rate-limit',
        'text':'Consumer Rate Limit',
        'default':0,
        'values':[0, 5000, 10000, 20000, 30000, 40000, 50000, 100000]
    },
    {
        'name':'consumer-count',
        'text':'Number of Consumer',
        'default':1,
        'values':[1, 2, 3, 4, 5, 6, 7, 8]
    },
    {
        'name':'min-msg-size',
        'text':'Message Size (byte)',
        'default':100,
        'values':[1000, 2000, 5000, 10000, 20000, 50000, 10000]
    },
]


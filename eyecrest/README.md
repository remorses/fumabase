<div align='center' className='w-full'>
    <br/>
    <br/>
    <br/>
    <h1>eyecrest</h1>
    <p>simple and fast full text search API. works on markdown files. does automatic chunking and scoring</p>
    <br/>
    <br/>
</div>

# Future Roadmap

## Replication.

To under replication, each write will be sent to the primary region DurableObject. This primary region will then forward these writes to the other regions durable object replicas. For the reads, instead, the API worker will simply get the closest DurableObject. This means that each DurableObject needs some additional state, specifically, to know if the DurableObject is the primary region, and to know what are the other available regions from the other replicas.

each write to the primary durable object will need to be forwarded to other replicas. This can be done by the the durable object getting stubs of other replicas in the constructor and calling methods on them.

## Sharding

sharding mean splitting the data inside the durable object sqlite database into multiple sqlite databases. the sharding key will be filename, using a jump hash algo to get a shard number from the filename string.

The API worker will always communicate with the main shard, shard 0. The shard 0 will then
- redirect upsert operations to the correct shard based on the filename
- search all shards for search operations
- read from the correct shard for file read operations

this way the only state needed by the API layer can be eventually consistent because
- primary region is immutable
- replica regions are eventually consistent

the shards will also be replicated in each region if region replicas are enabled.

Sharding will be implemented by using the filename as the sharding key using a jump ashing. This way, when the number of shards changes, the rows that need to be moved will be minimized. Each durable object key will include the shard number in it. When the sharding will be in progress, each durable object will need to do double writes and double reads to the new shard and old shard. When resharding starts I will notify what is the new count of shards to all sqlite existing shards. Then, for each old shards, I will spawn another durable object job, with the goal of moving the rows from the old shards to the new shards. These job will need to have persistent state for keeping track of:

- row ids moved
- last row id before sharding started
- owned shard number

I use many jobs instead of one to make resharding faster. The bottleneck will be the shard where the rows are being moved from, so I can parallelize the work by having multiple jobs working on different shards.

This durable object will start fetching all the rows from the old shards up until the last row that needs to be sharded. This can be done by sorting the rows by a field like the creation date and keeping track of what is the last row. The job will then know when the sharding is complete when it finds the batch with this last row. This job will fetch all the rows in batches and recompute the new sharding key for each row. If the sharding key, which is the shard number, changes, the row needs to be moved to the new shard. With move I need copied. To do this, each durable object with SQLite needs to have a method to read and write rows. When the job encounters the last row, it can start deleting the rows that have been moved from the old shard. To do this, it needs to keep track of the id's of the rows that have been moved. After the job completes, it can notify the old shard. So that this durable object can stop doing double writes and double reads. Thw sqlite durable object needs some state to know when shard is in progress and the new and old count of shards.

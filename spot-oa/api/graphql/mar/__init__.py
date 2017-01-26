from graphql import (
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLField
)

MarCurrentFlowType = GraphQLObjectType(
    name = 'MarCurrentFlowType',
    fields = {
        'local_ip': GraphQLField(
            type=GraphQLString,
            resolver=lambda root, args, *_ : root.get('local_ip')
        ),
        'local_port': GraphQLField(
            type=GraphQLInt,
            resolver=lambda root, args, *_ : root.get('local_port')
        ),
        'remote_ip': GraphQLField(
            type=GraphQLString,
            resolver=lambda root, args, *_ : root.get('remote_ip')
        ),
        'remote_port': GraphQLField(
            type=GraphQLInt,
            resolver=lambda root, args, *_ : root.get('remote_port')
        ),
        'status': GraphQLField(
            type=GraphQLString,
            resolver=lambda root, args, *_ : root.get('status')
        ),
        'user_id': GraphQLField(
            type=GraphQLString,
            resolver=lambda root, args, *_ : root.get('user_id')
        ),
        'user': GraphQLField(
            type=GraphQLString,
            resolver=lambda root, args, *_ : root.get('user')
        )
    }
)

MarType = GraphQLObjectType(
    name = 'MarType',
    fields = {
        'CurrentFlow': GraphQLField(
            type=MarCurrentFlowType,
            resolver=lambda root, args, *_ : root.get('CurrentFlow')
        )
    }
)

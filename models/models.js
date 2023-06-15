import {Schema, model} from "mongoose";

const CitySchema = new Schema( {
    name: {type: String, required: true}
})
const TopicSchema = new Schema( {
    name: {type: String, required: true}
})
const SectionSchema = new Schema( {
    name: {type: String, required: true},
    topicId:{type:Schema.Types.ObjectId, ref:'Topic', required: true}
})
const LevelSchema = new Schema( {
    name: {type: String, required: true},
    sectionId:{type:Schema.Types.ObjectId, ref:'Section', required: true}
})
const DurationSchema = new Schema( {
    name: {type: String, required: true}
})
const PeriodicitySchema = new Schema( {
    name: {type: String, required: true}
})
const TimeSchema = new Schema( {
    name: {type: String, required: true}
})
const FormatSchema = new Schema( {
    name: {type: String, required: true}
})
const AgeSchema = new Schema( {
    name: {type: String, required: true}
})
const RoleSchema = new Schema( {
    name: {type: String, unique:true, required: true, default:'USER'}
})
const UserSchema = new Schema( {
    email:{type: String, required:true, unique: true},
    password:{type: String, required:true},
    role:{type:Schema.Types.ObjectId, ref:'Role', required: true},
    name: {type: String, required: true},
    gender:{type:String, required: true},
    socialNetwork:{type:String},
    info:{type:String}
})
const SearchSchema = new Schema( {
    name: {type: String, required: true},
    owner:{type: Schema.Types.ObjectId, ref:'User', required:true},
    level:{type:Schema.Types.ObjectId, ref:'Level', required:true},
    duration:{type:Schema.Types.ObjectId, ref:'Duration', required:true},
    periodicity:{type:Schema.Types.ObjectId, ref:'Periodicity', required:true},
    time:{type:Schema.Types.ObjectId, ref:'Time', required:true},
    format:{type:Schema.Types.ObjectId, ref:'Format', required:true},
    city:{type:Schema.Types.ObjectId},
    numberOfPeople:{type: Number},
    participantsGender:{type:String},
    searchGender:{type:String},
    age:{type:Schema.Types.ObjectId, ref:'Age', required:true},
    participants:[{type:Schema.Types.ObjectId, ref:'User'}],
    marker:{type:Boolean, default:true}
})

const ReportSchema = new Schema({
    sender: {type: Schema.Types.ObjectId, ref:'User', required:true},
    offender: {type: Schema.Types.ObjectId, ref:'User', required:true},
    reportText: {type: String, required:true},
    processed: {type: Boolean, required:true, default:false}
})

const MessageListSchema = new Schema({
    searchId:{type:Schema.Types.ObjectId, ref:'Search', required:true},
    author:{type:Schema.Types.ObjectId, ref:'User', required:true},
    message:{type: String, required:true},
    time:{type: String, required:true}
})

const QuestionSchema = new Schema({
    sender: {type: Schema.Types.ObjectId, ref:'User', required:true},
    questionText: {type: String, required:true},
    answerText: {type: String}
})

const City = model('City', CitySchema)
const Topic = model('Topic', TopicSchema)
const Section = model('Section', SectionSchema)
const Level = model('Level', LevelSchema)
const Duration = model('Duration', DurationSchema)
const Periodicity = model('Periodicity', PeriodicitySchema)
const Time = model('Time', TimeSchema)
const Format = model('Format', FormatSchema)
const Age = model('Age', AgeSchema)
const Role = model('Role', RoleSchema)
const User = model('User', UserSchema)
const Search = model('Search', SearchSchema)
const Report = model('Report', ReportSchema)
const MessageList = model('MessageList', MessageListSchema)
const Question = model('Question', QuestionSchema)

export {
    City,
    Topic,
    Section,
    Level,
    Duration,
    Periodicity,
    Time,
    Format,
    Age,
    Role,
    User,
    Search,
    Report,
    MessageList,
    Question
}
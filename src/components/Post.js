import React, {useContext} from 'react';
import {ThemeContext} from "../contexts/appContext";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-navi'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const Post = ({id, title, content, author, short = false}) => {
    const classes = useStyles();
    const {primary_ui} = useContext(ThemeContext);
    let processedContent = content;
    if (short) {
        if (content.length > 30) {
            processedContent = content.substring(0, 30) + '...';
        }
    }
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography color={primary_ui} variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {author}
                </Typography>
                <Typography variant="body2" component="p">
                    {processedContent}
                </Typography>
                {
                    short &&
                    <div>
                        <br/>
                        <Link href={`/view/${id}`}>View full post</Link>
                    </div>
                }
            </CardContent>
        </Card>
    );
};

export default React.memo(Post);

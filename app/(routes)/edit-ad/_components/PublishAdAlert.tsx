import React, {useState} from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {Loader} from "lucide-react";
import {supabase} from "@/utils/client";
import {toast} from "sonner";

type PublishAdAlertType = {
    idFromParams: string
}

function PublishAdAlert({idFromParams}: PublishAdAlertType) {
    const [loading, setLoading] = useState(false)
    const publishBtnHandler = async () => {
        setLoading(true)
        const {data, error} = await supabase
            .from('listing')
            .update({active: true})
            .eq('id', idFromParams)
            .select()
        if (data) {
            setLoading(false)
            toast("Your ad published")
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button disabled={loading} type={'button'}>
                    {loading ? <Loader className={'animate-spin'}/> : 'Save and Publish'}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you ready to publish your ad?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will add a new ad, also you can edit it later.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => publishBtnHandler()}>
                        {loading ? <Loader className={'animate-spin'}/> : 'Continue'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default PublishAdAlert;